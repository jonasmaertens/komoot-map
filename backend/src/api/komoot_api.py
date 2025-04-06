import time
import logging
from typing import List, Dict, Any, Optional
import requests
import unicodedata
from ..utils.config import KOMOOT_USER_ID, API_RATE_LIMIT

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class KomootAPI:
    def __init__(self, cookies: List[Dict[str, str]]):
        self.session = requests.Session()
        for cookie in cookies:
            self.session.cookies.set(cookie['name'], cookie['value'])
        
        self.headers = {
            "accept": "application/json",
            "onlyprops": "true",
        }
    
    def _make_request(self, url: str, method: str = "GET", use_headers: bool = True, **kwargs) -> Dict[str, Any]:
        """
        Make a request to the Komoot API with rate limiting.
        
        Args:
            url: The URL to request
            method: HTTP method (GET, POST, etc.)
            use_headers: Whether to use the default headers
            **kwargs: Additional arguments to pass to requests
            
        Returns:
            JSON response data
        """
        time.sleep(API_RATE_LIMIT)  # Rate limit from config
        
        # Log cookies before request
        logger.info(f"Cookies for request to {url}:")
        for cookie in self.session.cookies:
            logger.info(f"  {cookie.name} = {cookie.value[:10]}...")
        
        request_kwargs = kwargs.copy()
        if use_headers:
            request_kwargs['headers'] = self.headers
        
        response = self.session.request(
            method=method,
            url=url,
            **request_kwargs
        )
        
        response.raise_for_status()
        return response.json()
    
    def _make_text_request(self, url: str, method: str = "GET", use_headers: bool = False, **kwargs) -> str:
        """
        Make a request to the Komoot API that returns text (not JSON).
        
        Args:
            url: The URL to request
            method: HTTP method (GET, POST, etc.)
            use_headers: Whether to use the default headers
            **kwargs: Additional arguments to pass to requests
            
        Returns:
            Text response
        """
        time.sleep(API_RATE_LIMIT)  # Rate limit from config
        
        request_kwargs = kwargs.copy()
        if use_headers:
            request_kwargs['headers'] = self.headers
        
        response = self.session.request(
            method=method,
            url=url,
            **request_kwargs
        )
        
        response.raise_for_status()
        return response.text
    
    def get_total_tours(self) -> int:
        """Get total number of recorded tours."""
        url = f"https://www.komoot.com/de-de/user/{KOMOOT_USER_ID}/tours?type=recorded"
        data = self._make_request(url, use_headers=True)
        return data["kmtx"]["session"]["_embedded"]["profile"]["_embedded"]["tours_summary"]["total"]["recorded"]["sum"]
    
    def get_tours(self, limit: int = None) -> List[Dict[str, Any]]:
        """Get list of tours."""
        if limit is None:
            limit = self.get_total_tours()
            
        url = (
            f"https://www.komoot.com/api/v007/users/{KOMOOT_USER_ID}/tours/"
            f"?sport_types=&type=tour_recorded&sort_field=date&sort_direction=desc"
            f"&name=&status=private&hl=de&page=0&limit={limit}"
        )
        return self._make_request(url, use_headers=False)["_embedded"]["tours"]
    
    def get_tour_gpx(self, tour_id: str) -> str:
        """Get GPX data for a specific tour."""
        url = f"https://www.komoot.com/api/v007/tours/{tour_id}.gpx"
        return self._make_text_request(url, use_headers=False) 
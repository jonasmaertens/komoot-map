#!/usr/bin/env python
# -*- coding: UTF-8 -*-
import datetime
import json
import os
import time
import gpxdata
import requests
from geopy.distance import geodesic
import warnings
warnings.filterwarnings("ignore")

start_time = datetime.datetime.now()
print(start_time)
root_path = os.path.dirname(os.path.realpath(__file__))
gpx_dir = os.path.join(root_path, 'gpxe')
kmldir = os.path.join(root_path, "kmls", "")
new_kmldir = os.path.join(root_path, "kmlssimple", "")
s = requests.Session()
s.verify = False
data = '{"email": "***REMOVED***", "password": "***REMOVED***", "reason": null}'
url = "https://account.komoot.com/v1/signin"
loginHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    'Content-Type': 'application/json',
    'Origin': 'https://account.komoot.com',
    'Referer': 'https://account.komoot.com/signin',
    'Accept-Encoding': 'gzip, deflate, br'
}
r = s.post(url, data=data, headers=loginHeaders)
time.sleep(0.5)
# print(r.encoding)
print(r.content.decode())
# print(r.headers)
r_trans = s.get("https://account.komoot.com/actions/transfer?type=signin")
time.sleep(0.5)
#print(s.cookies.get_dict())
r_list_len = s.get("https://www.komoot.com/de-de/user/***REMOVED***/tours?type=recorded")
time.sleep(0.5)
total_tours = r_list_len.content.decode().split('<span>Gemacht</span><span class="tw-ml-3 tw-text-sm tw-text-right tw-font-normal tw-text-green">')[1].split('</span>')[0]
print(total_tours, ' Tours')
r_list = s.get('https://www.komoot.com/api/v007/users/***REMOVED***/tours/?sport_types=&type=tour_recorded&sort_field=date&sort_direction=desc&name=&status=private&hl=de&page=0&limit={}'.format(total_tours))
time.sleep(0.5)
toursList = json.loads(r_list.content.decode())['_embedded']['tours']
toursNew = []
toursCurrent = [int(el.replace(".kml", "")) for el in os.listdir(new_kmldir) if ".kml" in el]
#print('Current: ', gpxeCurrent)
# print(toursList)
for tour in toursList:
    # print(tour['id'])
    if tour['id'] not in toursCurrent:
        toursNew.append(tour['id'])
print('New: ', toursNew)
for tour in toursNew:
    r = s.get('https://www.komoot.com/api/v007/tours/{}.gpx'.format(tour))
    with open(os.path.join(root_path, 'gpxe', '{}.gpx'.format(tour)), 'w') as f:
        f.write(r.content.decode().replace('ü','ue').replace('ö','oe').replace('ä','ae').replace('ß','ss').replace('&amp;',' und ').encode("ascii", "ignore").decode())
        print("Added ", tour)
    time.sleep(0.2)

all_kml_files = [f for f in os.listdir(kmldir) if os.path.isfile(os.path.join(kmldir, f))]
for file in os.listdir(gpx_dir):
    if ".gpx" in file:
        if file.replace(".gpx", ".kml") not in all_kml_files:
            print(file.replace(".gpx", ".kml"))
            tempfile = open(os.path.join(gpx_dir, file), "r")
            tempfile_str = tempfile.read()
            tempfile.close()
            if len(list(tempfile_str)) > 0:
                doc = gpxdata.Document.readGPX(os.path.join(gpx_dir, file), file)
                file2 = open(kmldir + file.replace(".gpx", ".kml"), 'w')
                kml = doc.writeKML(file2)
                print(os.path.join(gpx_dir, file) + " konvertiert")
                file2.close()
        else:
            continue
all_simple_kml_files = [f for f in os.listdir(new_kmldir) if os.path.isfile(os.path.join(new_kmldir, f))]
for filename in os.listdir(kmldir):
    if ".kml" in filename:
        if filename not in all_simple_kml_files:
            file = open(os.path.join(kmldir, filename), "r")
            content = file.read()
            points = content.split("<coordinates>")[1].split("</coordinates>")[0].split(" ")
            for i in range(len(points)):
                points[i] = points[i].split(",")[:2]
            i = 0
            initial_len = len(points)
            while i < len(points) - 2:
                coords = (float(points[i][1]), float(points[i][0]))
                coords_next = (float(points[i + 1][1]), float(points[i + 1][0]))
                distance = geodesic(coords, coords_next).km * 1000
                if distance <= 60:
                    points.pop(i + 1)
                else:
                    i += 1
            new_points = [[float(points[0][0]), float(points[0][1])]]
            for i in range(len(points)):
                if i >= 2:
                    coords = (float(points[i][1]), float(points[i][0]))
                    coords_last = (float(points[i - 1][1]), float(points[i - 1][0]))
                    coords_last2 = (float(points[i - 2][1]), float(points[i - 2][0]))
                    hypotenuse = geodesic(coords, coords_last2).km * 1000
                    cathetus_sum = (geodesic(coords, coords_last).km + geodesic(coords_last, coords_last2).km) * 1000
                    difference = cathetus_sum - hypotenuse
                    if difference > 0.2:
                        new_points.append([float(points[i - 1][0]), float(points[i - 1][1])])
            new_points.append([float(points[- 1][0]), float(points[- 1][1])])
            print(initial_len, "==>", len(new_points))
            new_points_string = "<coordinates>"
            for point in new_points:
                new_points_string += str(point[0]) + "," + str(point[1]) + " "
            new_points_string += "</coordinates>"
            new_kml = content.split("<coordinates>")[0] + new_points_string + content.split("</coordinates>")[1]
            new_kml = new_kml.replace("</name>\n    <LineString>", f" $URL{filename.replace('.kml', '')}$URL</name>\n    <LineString>")
            file.close()
            new_file = open(os.path.join(new_kmldir, filename), "w")
            new_file.write(new_kml)
            new_file.close()
onlyfiles = [f for f in os.listdir(new_kmldir) if (os.path.isfile(os.path.join(new_kmldir, f)) and '.kml' in f)]
with open(os.path.join(new_kmldir,'kml_list.json'), 'w') as file:
    file.write(json.dumps(onlyfiles))
print("Cleanup")
for file in os.listdir(gpx_dir):
    if ".gpx" in file:
        os.remove(os.path.join(gpx_dir, file))
        print(os.path.join(gpx_dir, file) + " gelöscht")
for file in os.listdir(kmldir):
    if ".kml" in file:
        os.remove(os.path.join(kmldir, file))
        print(os.path.join(kmldir, file) + " gelöscht")
print("Fertig in", (datetime.datetime.now() - start_time).seconds, "Sekunden")
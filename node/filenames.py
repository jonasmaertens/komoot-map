from os import listdir
import json
from os.path import isfile, join
onlyfiles = [f for f in listdir('kmls') if isfile(join('kmls', f))]
with open('kmlssimple/kml_list.json', 'w') as file:
    file.write(json.dumps(onlyfiles))
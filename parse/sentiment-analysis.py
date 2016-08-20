import argparse
from googleapiclient import discovery
import httplib2
import json
from oauth2client.client import GoogleCredentials
import csv
from optparse import OptionParser

DISCOVERY_URL = ('https://{api}.googleapis.com/'
                 '$discovery/rest?version={apiVersion}')

def main(filename):
  '''Run a sentiment analysis request on text within a passed filename'''
  print "Starting..."
  http = httplib2.Http()

  credentials = GoogleCredentials.get_application_default().create_scoped(
      ['https://www.googleapis.com/auth/cloud-platform'])
  http=httplib2.Http()
  credentials.authorize(http)

  service = discovery.build('language', 'v1beta1',
                            http=http, discoveryServiceUrl=DISCOVERY_URL)
  filepath = filename
  f = open(filepath, 'r')
  data = csv.reader(f, delimiter='\t')
  count = 10
  for row in data:
    if count == 0:
      break
    if row[1] != "eng":
      continue
    print row[2]
    count = count - 1
    service_request = service.documents().analyzeSentiment(
      body={
        'document': {
           'type': 'PLAIN_TEXT',
           'content': row[2],
        }
      })

    response = service_request.execute()
    polarity = response['documentSentiment']['polarity']
    magnitude = response['documentSentiment']['magnitude']
    print polarity, magnitude
  return 0

if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument(
    'filename', help='The file you\'d like to analyze.')
  args = parser.parse_args()
  main(args.filename)
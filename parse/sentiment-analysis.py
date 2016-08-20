import argparse
from googleapiclient import discovery
import httplib2
import json
import uuid
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
  writeFile = open("sentences_with_feelings.csv", 'a')
  data = csv.reader(f, delimiter='\t')
  writeTo = csv.writer(writeFile, delimiter=',')
  # writeTo.writerow(["text", "polarity", "magnitude"])
  count = 0
  skipTill = 10000
  for row in data:
    if count == 15000:
      break
    if row[1] != "eng":
      continue
    count = count + 1
    if count < skipTill:
      continue
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
    rowToWrite = [row[2], polarity, magnitude]
    writeTo.writerow(rowToWrite)
    print rowToWrite
  return 0

if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument(
    'filename', help='The file you\'d like to analyze.')
  args = parser.parse_args()
  main(args.filename)
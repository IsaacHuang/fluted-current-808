# Copyright 2014 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Managed VMs sample application using OpenCV, App Engine Modules, and Task Queues."""

import base64
import jinja2
import json
import logging
import os
import webapp2
import MySQLdb
import datastore_class

from google.appengine.api import taskqueue




JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'])

def decode_if_needed(data):
    if data.startswith('data') and 'base64' in data:
        # remove data URL prefixes
        data = data.split('base64,', 1)[1]
        data = base64.standard_b64decode(data)
    return data


class MainHandler(webapp2.RequestHandler):
    """Handles requests to the main page, which supports video capture of a puzzle
    to be solved."""

    def get(self):
        """Display the index page."""

        template = JINJA_ENVIRONMENT.get_template('templates/index.html')
        self.response.out.write(template.render({}))

class UploadImage(webapp2.RequestHandler):#上傳圖片的class====>要重寫
    """Handles requests to show a puzzle upload page, which supports upload of sudoku
    image files."""

    """顯示上傳頁面函數"""
    def get(self):
        """Display the puzzle upload page."""

        template = JINJA_ENVIRONMENT.get_template('templates/upload.html')
        self.response.out.write(template.render({}))

"""儲存資料的class"""


class Database(webapp2.RequestHandler):
    try:
        db=MySQLdb.connect("140.135.247.116:8889","SA_test","root","root")
        print "Connection is successful !"
    except:
        print "db is Over T_T "

APP = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/upload', UploadImage),
    ('/db_con',Database)
], debug=True)

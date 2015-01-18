# -*- coding: utf-8 -*-
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
import urllib2
import cgi
from google.appengine.ext import db
from datetime import datetime
import DatabaseClassModel




JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'])



"""def decode_if_needed(data):
    if data.startswith('data') and 'base64' in data:
        # remove data URL prefixes
        data = data.split('base64,', 1)[1]
        data = base64.standard_b64decode(data)
    return data"""


class MainHandler(webapp2.RequestHandler):
    """Handles requests to the main page, which supports video capture of a puzzle
    to be solved."""

    def get(self):
        """Display the index page."""

        
        #self.response.headers['Content-Type'] = 'text/csv'
        #self.response.out.write(self.dump_csv())  
        template = JINJA_ENVIRONMENT.get_template('templates/index.html')
        self.response.headers.add_header("Access-Control-Allow-Origin", "*")
        self.response.out.write(template.render({}))

class TakePhoto(webapp2.RequestHandler):
    def post(self):
        #form=cgi.FieldStorage()
        #custom_pic=form.getvalue('custom_pic','').encode("base64")
        #存入datastore，順便轉成字串
        template = JINJA_ENVIRONMENT.get_template('templates/edit.html')
        self.response.out.write(template.render({}))   


APP = webapp2.WSGIApplication([
    ('/', MainHandler),('/facebook',TakePhoto)
], debug=True)

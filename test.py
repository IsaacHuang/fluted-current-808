# -*- coding: utf-8 -*-
import cgi

form=cgi.FieldStorage()
custom_pic=form.getvalue('custom_pic','')

print "<img src='%s'>"%custom_pic
print "Successful!"
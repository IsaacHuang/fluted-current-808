#encoding: utf-8
#!/usr/bin/env python

import MySQLdb
import socket

#連結資料庫
myname=socket.getfqdn(socket.gethostname())
localip=socket.gethostbyname(myname)
print "ip:%s"%localip
#db=MySQLdb.connect("140.135.247.116:8889","SA_test","root","root")
db=MySQLdb.connect("%s:8889","SA_test","root","root")

ps -ax | grep "total." | grep -v grep | nawk '{print $1}' | xargs kill -9
netstat -tulpan | grep 5858 | nawk '{ gsub("/node",""); print $7 }' | xargs kill -9 
node --debug index.js 

ps -ax | grep "total." | grep -v grep | nawk '{print $1}' | xargs kill -9
node index.js

echo "Initial Start:";
while [ true ]; do
	node .
	echo "Process exited or crashed, restarting in 3 seconds.";
	sleep 3
done

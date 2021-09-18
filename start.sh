while [ true ]; do
	echo "Starting bot...";
	node .;
	echo "Process exited or crashed. Restarting in 3 seconds...";
	sleep 3;
done


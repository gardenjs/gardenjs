tmux has-session garden
if [ $? != 0 ]
then
  tmux new-session -s garden -n editor -d
  tmux new-window -n terminal -t garden
  tmux split-window -h -t garden:2
  tmux split-window -v -t garden:2.1
  tmux send-keys -t garden:1 'vim -S .vimsession' C-m
  tmux send-keys -t garden:2.1 'git status' C-m
  tmux send-keys -t garden:2.3 'npm run tdd' C-m
  tmux send-keys -t garden:2.2 'cd ../..' C-m
  tmux send-keys -t garden:2.2 './github.sh' C-m
  tmux select-window -t garden:1
fi
tmux attach -t garden

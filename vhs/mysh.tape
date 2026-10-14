Output public/vhs/mysh.webm
Set FontSize 14
Set Width 1200
Set Height 600
Set Theme {"background": "#0a0a0a", "foreground": "#ededed", "cursor": "#8b5cf6", "selection": "#8b5cf6", "black": "#0a0a0a", "red": "#ef4444", "green": "#22c55e", "yellow": "#eab308", "blue": "#3b82f6", "magenta": "#8b5cf6", "cyan": "#06b6d4", "white": "#ededed", "brightBlack": "#666666", "brightRed": "#f87171", "brightGreen": "#4ade80", "brightYellow": "#facc15", "brightBlue": "#60a5fa", "brightMagenta": "#a78bfa", "brightCyan": "#22d3ee", "brightWhite": "#ffffff"}
Set Padding 20
Set Framerate 30

Hide
Type "./mysh"
Enter
Show

Sleep 500ms
Type "ls -la"
Enter
Sleep 1s
Type "profile on"
Enter
Sleep 500ms
Type "cat /etc/passwd | wc -l"
Enter
Sleep 1s
Type "profile off"
Enter
Sleep 500ms
Type "profile show"
Enter
Sleep 2s

Type "exit"
Enter
Sleep 500ms

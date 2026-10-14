Output public/vhs/ventorygo.webm
Set FontSize 14
Set Width 1200
Set Height 600
Set Theme {"background": "#0a0a0a", "foreground": "#ededed", "cursor": "#8b5cf6", "selection": "#8b5cf6", "black": "#0a0a0a", "red": "#ef4444", "green": "#22c55e", "yellow": "#eab308", "blue": "#3b82f6", "magenta": "#8b5cf6", "cyan": "#06b6d4", "white": "#ededed", "brightBlack": "#666666", "brightRed": "#f87171", "brightGreen": "#4ade80", "brightYellow": "#facc15", "brightBlue": "#60a5fa", "brightMagenta": "#a78bfa", "brightCyan": "#22d3ee", "brightWhite": "#ffffff"}
Set Padding 20
Set Framerate 30

Hide
Type "curl -s localhost:8080/api/invoices | jq ."
Show

Sleep 500ms
Enter
Sleep 1500ms

Type "curl -s -X POST localhost:8080/api/invoices -d @invoice.json | jq .id"
Enter
Sleep 1500ms

Type "curl -s -c cookies.txt -X POST localhost:8080/api/login -d @credentials.json | jq .status"
Enter
Sleep 1500ms

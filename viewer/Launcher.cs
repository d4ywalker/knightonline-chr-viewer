using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Text;
using System.Threading;
using System.Windows.Forms;

public class Program {
    [STAThread]
    public static void Main() {
        string baseDir = AppDomain.CurrentDomain.BaseDirectory;
        string appDir = File.Exists(Path.Combine(baseDir, "server.ps1")) ? baseDir : Path.Combine(baseDir, "viewer");
        if (!File.Exists(Path.Combine(appDir, "server.ps1"))) {
            if (File.Exists(@"d:\CHAR EDITOR\viewer\server.ps1")) {
                appDir = @"d:\CHAR EDITOR\viewer";
            } else if (File.Exists(@"d:\CHAR EDITOR\server.ps1")) {
                appDir = @"d:\CHAR EDITOR";
            } else {
                appDir = @"d:\EDITOR CHARACTER DAN MONSTER\viewer";
            }
        }
        string serverScript = Path.Combine(appDir, "server.ps1");
        string edgePath = @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe";

        // Check if server is responding on port 8085
        bool isRunning = false;
        try {
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create("http://localhost:8085/index.html");
            req.Timeout = 1000;
            using (HttpWebResponse resp = (HttpWebResponse)req.GetResponse()) {
                if (resp.StatusCode == HttpStatusCode.OK) isRunning = true;
            }
        } catch {}

        if (!isRunning) {
            // Launch server hidden in background
            ProcessStartInfo srvInfo = new ProcessStartInfo();
            srvInfo.FileName = "powershell.exe";
            srvInfo.Arguments = "-ExecutionPolicy Bypass -WindowStyle Hidden -File \"" + serverScript + "\" -Port 8085";
            srvInfo.WorkingDirectory = appDir;
            srvInfo.CreateNoWindow = true;
            srvInfo.UseShellExecute = false;
            Process.Start(srvInfo);
            Thread.Sleep(1200);
        }

        // Launch as Native Desktop Application Window
        ProcessStartInfo appInfo = new ProcessStartInfo();
        if (File.Exists(edgePath)) {
            appInfo.FileName = edgePath;
            appInfo.Arguments = "--app=http://localhost:8085/ --window-size=1366,850 --window-position=100,50";
        } else {
            appInfo.FileName = "http://localhost:8085/";
        }
        Process.Start(appInfo);
    }
}

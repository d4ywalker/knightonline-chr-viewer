# Knight Online 3D Character & Model Viewer

[![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/)
[![C#](https://img.shields.io/badge/C%23-.NET-239120?style=for-the-badge&logo=csharp&logoColor=white)](https://dotnet.microsoft.com/)
[![WebGL](https://img.shields.io/badge/WebGL-2.0-990000?style=for-the-badge&logo=webgl&logoColor=white)](https://get.webgl.org/)
[![YouTube Demo](https://img.shields.io/badge/YouTube-Video_Demo-red?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=qYxHie-fl7E)

An interactive **3D Web & Desktop Model Viewer** designed for **Knight Online**. It features a custom in-browser binary parser for proprietary NoahSystem (.n3chr, .n3anim, .n3pmesh, .n3shape) formats, DXT texture decompressor, and real-time particle/FX rendering powered by Three.js WebGL.

---

## Video Demo & Preview

<div align="center">

[![Watch Knight Online Character Viewer Demo](https://img.youtube.com/vi/qYxHie-fl7E/hqdefault.jpg)](https://www.youtube.com/watch?v=qYxHie-fl7E)

<br/>

[![Watch on YouTube](https://img.shields.io/badge/Watch_Full_Demo_on_YouTube-red?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com/watch?v=qYxHie-fl7E)

</div>

---

## Key Features

- **3D Character & Monster Viewer**: Full real-time preview of Knight Online player races, armor sets, monsters, and NPC models.
- **Weapon & Item Attachment**: Dynamic equipping of weapons, shields, helmets, and accessories.
- **Animation & Skeletal System**: Play, loop, blend, and inspect character animations (.n3anim) in real-time.
- **FX & Particle Engine**: Custom particle effect simulator (fx_system.js) for skills, glowing weapons, and ambient effects.
- **DXT Texture Decompression**: Native in-memory decoding of DXT1/DXT3/DXT5 and BMP textures directly to WebGL textures.
- **Integrated Catalogs**: Searchable item, monster, and object catalog with instant asset lookup.
- **Desktop Native Mode**: Runs seamlessly as a lightweight standalone Windows application using Edge WebView / PowerShell backend server.

---

## Architecture & Tech Stack

```
knightonline-chr-viewer/
鈹溾攢鈹€ viewer/
鈹?  鈹溾攢鈹€ index.html              # Main 3D UI & WebGL Viewport
鈹?  鈹溾攢鈹€ css/                    # Responsive dark theme styling
鈹?  鈹溾攢鈹€ js/
鈹?  鈹?  鈹溾攢鈹€ app.js              # UI controller, state management & catalog loader
鈹?  鈹?  鈹溾攢鈹€ n3_parser.js        # NoahSystem binary format parser (.n3chr, .n3pmesh, etc.)
鈹?  鈹?  鈹溾攢鈹€ dxt_decoder.js      # In-browser DXT1/3/5 texture decoder
鈹?  鈹?  鈹斺攢鈹€ fx_system.js        # Knight Online FX & particle simulator
鈹?  鈹溾攢鈹€ libs/
鈹?  鈹?  鈹溾攢鈹€ three.min.js        # Three.js 3D WebGL rendering engine
鈹?  鈹?  鈹斺攢鈹€ OrbitControls.js    # Interactive camera controls
鈹?  鈹溾攢鈹€ items_catalog.json      # Structured database of items & weapons
鈹?  鈹溾攢鈹€ models_catalog.json     # Monster & character model index
鈹?  鈹溾攢鈹€ objects_catalog.json    # World objects & map asset catalog
鈹?  鈹溾攢鈹€ server.ps1              # Lightweight local HTTP server with range requests
鈹?  鈹斺攢鈹€ Launcher.cs             # C# native window wrapper
鈹溾攢鈹€ Jalankan_Editor.bat         # 1-Click launcher script
鈹溾攢鈹€ Start_Server.bat            # Server-only launcher
鈹斺攢鈹€ .gitignore
```

---

## Getting Started

### Prerequisites
- Windows 10/11
- Microsoft Edge / Modern Web Browser (Chrome, Firefox, Edge)

### Running the Viewer

1. **Clone the repository:**
   ```bash
   git clone https://github.com/d4ywalker/knightonline-chr-viewer.git
   ```

2. **Add Knight Online Game Assets (Optional for full rendering):**
   Place your unpacked client folders (Chr, Item, Object, fx) in the root directory.

3. **Launch the Application:**
   - Double-click `Jalankan_Editor.bat` (or run `Start_Server.bat` and open `http://localhost:8085/index.html` in your browser).

---

## Author & Support

Developed by **[Nex2killer (d4ywalker)](https://github.com/d4ywalker)**  
- **Discord**: `ahmad.bai`
- **Facebook**: [near.ahmad](https://www.facebook.com/near.ahmad)
- **Instagram**: [@ahmadbaihaqi27](https://instagram.com/ahmadbaihaqi27)
- **YouTube**: [Watch Demo Video](https://www.youtube.com/watch?v=qYxHie-fl7E)
- **PayPal**: `vishaka.ahmad@gmail.com`
- **USDT (TRC-20)**: `TY4KH1tfqfPTd3vQ2Vw4EzeEuKEmdsyyjL`
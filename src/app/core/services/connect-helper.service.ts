// import { Injectable } from '@angular/core';
// import { BrowserWindow } from 'electron';
// import url from 'url';
// import { AppConfig } from '../../../environments/environment';
// import { ElectronService } from './electron.service';

// // COMMENTED OUT: Import nut-js from the main module (avoid dist path issues)
// // import { Key, mouse, keyboard, Button } from '@nut-tree-fork/nut-js';

// // TEMPORARY IMPORTS: Only for mouse functionality (comment out if mouse also causes issues)
// import { mouse, Button } from '@nut-tree-fork/nut-js';

// declare var window: any;

// @Injectable({
//   providedIn: 'root',
// })
// export class ConnectHelperService {
//   // COMMENTED OUT: Keyboard lookup map
//   /*
//   public KeyLookupMap = new Map<Key, string | null>([
//     [Key.A, 'a'], [Key.B, 'b'], [Key.C, 'c'], [Key.D, 'd'], [Key.E, 'e'],
//     [Key.F, 'f'], [Key.G, 'g'], [Key.H, 'h'], [Key.I, 'i'], [Key.J, 'j'],
//     [Key.K, 'k'], [Key.L, 'l'], [Key.M, 'm'], [Key.N, 'n'], [Key.O, 'o'],
//     [Key.P, 'p'], [Key.Q, 'q'], [Key.R, 'r'], [Key.S, 's'], [Key.T, 't'],
//     [Key.U, 'u'], [Key.V, 'v'], [Key.W, 'w'], [Key.X, 'x'], [Key.Y, 'y'],
//     [Key.Z, 'z'], [Key.Space, 'space'], [Key.Enter, 'enter'], [Key.Backspace, 'backspace'],
//     [Key.Tab, 'tab'], [Key.Escape, 'escape'], [Key.Left, 'left'], [Key.Right, 'right'],
//     [Key.Up, 'up'], [Key.Down, 'down'],
//     // Add more keys as needed
//   ]);
//   */

//   infoWindow: BrowserWindow;

//   constructor(private electronService: ElectronService) {
//     // COMMENTED OUT: Keyboard test assignment
//     // window.test = this.KeyLookupMap;
//   }

//   // Scroll handler - KEEP THIS (should work)
//   handleScroll(text: string) {
//     try {
//       const [t, ud] = text.split(',');
//       if (ud === 'up') mouse.scrollUp(50);
//       else mouse.scrollDown(50);
//     } catch (error) {
//       console.error('Scroll error:', error);
//     }
//   }

//   // Mouse handler - KEEP THIS (should work)
//   handleMouse(text: string) {
//     try {
//       const [t, x, y, bStr] = text.split(',');
//       const b = +bStr || 0;

//       switch (t) {
//         case 'md':
//           mouse.pressButton(b as Button);
//           break;
//         case 'mu':
//           mouse.releaseButton(b as Button);
//           break;
//         case 'mm':
//           mouse.setPosition({ x: +x, y: +y });
//           break;
//       }
//     } catch (error) {
//       console.error('Mouse error:', error);
//     }
//   }

//   // Generate a random three-digit number - KEEP THIS
//   threeDigit() {
//     return Math.floor(Math.random() * (999 - 100 + 1) + 100);
//   }

//   // COMMENTED OUT: Keyboard handler - THIS IS THE MAIN CULPRIT
//   /*
//   handleKey(data: { key: string; shift?: boolean; control?: boolean; alt?: boolean; meta?: boolean }) {
//     const k = data.key;
//     const modifiers: Key[] = [];

//     if (data.shift) modifiers.push(Key.LeftShift);
//     if (data.control) modifiers.push(process.platform === 'darwin' ? Key.LeftSuper : Key.LeftControl);
//     if (data.alt) modifiers.push(Key.LeftAlt);
//     if (data.meta) modifiers.push(Key.Home);

//     if (modifiers.length > 0) {
//       const id = [...this.KeyLookupMap.entries()]
//         .filter(([_, v]) => v === k.toLowerCase())
//         .map(([d]) => d)[0];
//       keyboard.pressKey(modifiers[0]);
//       keyboard.pressKey(id);
//       keyboard.releaseKey(modifiers[0]);
//       keyboard.releaseKey(id);
//     } else {
//       keyboard.type(k);
//     }
//   }
//   */

//   // TEMPORARY REPLACEMENT: Keyboard handler that just logs (no actual keyboard input)
//   handleKey(data: { key: string; shift?: boolean; control?: boolean; alt?: boolean; meta?: boolean }) {
//     console.log('Keyboard input received (disabled):', data);
//     // TODO: Re-enable keyboard functionality after fixing nut-js issues
//   }

//   // Info window handlers - KEEP THESE
//   closeInfoWindow() {
//     try { this.infoWindow?.close(); } catch (err) {}
//   }

//   showInfoWindow() {
//     if (!this.electronService.isElectronApp) {
//       window.open('http://localhost:4200/#/info-window', '_blank');
//       return;
//     }

//     const appPath = this.electronService.remote.app.getAppPath();

//     try {
//       const BrowserWindow = this.electronService.remote.BrowserWindow;
//       this.infoWindow = new BrowserWindow({
//         height: 50,
//         width: 50,
//         x: 0,
//         y: 100,
//         resizable: false,
//         show: false,
//         frame: false,
//         transparent: true,
//         backgroundColor: '#252a33',
//         webPreferences: {
//           webSecurity: false,
//           nodeIntegration: true,
//           allowRunningInsecureContent: true,
//           contextIsolation: false,
//           enableRemoteModule: true,
//         } as any,
//       });

//       this.electronService.remote
//         .require('@electron/remote/main')
//         .enable(this.infoWindow.webContents);

//       this.infoWindow.setAlwaysOnTop(true, 'status');

//       if (AppConfig.production) {
//         this.infoWindow.loadURL(
//           url.format({
//             pathname: this.electronService.path.join(appPath, 'dist/index.html'),
//             hash: '/info-window',
//             protocol: 'file:',
//             slashes: true,
//           })
//         );
//       } else {
//         this.infoWindow.loadURL('http://localhost:4200/#/info-window');
//       }

//       this.infoWindow.show();
//     } catch (error) {
//       console.error('Error opening info window', error);
//     }
//   }
// }



//  UPDATE BY CHATGPT

import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { AppConfig } from '../../../environments/environment';

// Import nut-js directly
import { keyboard, Key, mouse, Button } from '@nut-tree-fork/nut-js';

declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class ConnectHelperService {
  infoWindow: any;

  constructor(private electronService: ElectronService) {}

  // Scroll handler
  handleScroll(text: string) {
    try {
      const [, ud] = text.split(',');
      if (ud === 'up') mouse.scrollUp(50);
      else mouse.scrollDown(50);
    } catch (error) {
      console.error('Scroll error:', error);
    }
  }

  // Mouse handler
  handleMouse(text: string) {
    try {
      const [t, x, y, bStr] = text.split(',');
      const b = +bStr || 0;

      switch (t) {
        case 'md':
          mouse.pressButton(b as Button);
          break;
        case 'mu':
          mouse.releaseButton(b as Button);
          break;
        case 'mm':
          mouse.setPosition({ x: +x, y: +y });
          break;
        case 'dc':
          mouse.click(Button.LEFT);
          mouse.click(Button.LEFT);
          break;
      }
    } catch (error) {
      console.error('Mouse error:', error);
    }
  }

  threeDigit() {
    return Math.floor(Math.random() * (999 - 100 + 1) + 100);
  }

  // Keyboard handler
  /**
   * data: { key: string; shift?: boolean; control?: boolean; alt?: boolean; meta?: boolean; code?: string }
   */
  async handleKey(data: { key?: string; shift?: boolean; control?: boolean; alt?: boolean; meta?: boolean; code?: string }) {
    try {
      if (!this.electronService.isElectron) {
        console.log('Not running in electron - keyboard input ignored.', data);
        return;
      }

      // Determine platform safely (electron process or navigator)
      const rawPlatform = (window as any)?.process?.platform ?? (navigator?.platform ?? '').toString();
      const platformStr = String(rawPlatform).toLowerCase();
      const isMac = platformStr.includes('darwin') || platformStr.includes('mac');

      const modifiers: Key[] = [];
      if (data.shift) modifiers.push(Key.LeftShift);
      if (data.control) modifiers.push(isMac ? Key.LeftControl : Key.LeftControl); // control mapped to LeftControl (on mac control exists too)
      if (data.alt) modifiers.push(Key.LeftAlt);
      if (data.meta) modifiers.push(Key.LeftSuper);

      // Helper to get a reversed copy without mutating original
      const reversedModifiers = [...modifiers].reverse();

      // If single printable character -> type it (with modifiers pressed)
      if (data.key && data.key.length === 1) {
        if (modifiers.length > 0) {
          for (const m of modifiers) await keyboard.pressKey(m);
          await keyboard.type(data.key);
          for (const m of reversedModifiers) await keyboard.releaseKey(m);
        } else {
          await keyboard.type(data.key);
        }
        return;
      }

      // For special keys, try to map using code or key if possible
      const keyName = data.code || data.key || '';
      let keyToPress: Key | null = null;

      // Try multiple strategies to look up enum value
      try {
        // direct lookup (if code matches enum member name)
        keyToPress = (Key as any)[keyName] ?? null;
        if (!keyToPress && data.key) {
          // try with the human-readable key name as fallback
          keyToPress = (Key as any)[data.key] ?? null;
        }
      } catch (e) {
        keyToPress = null;
      }

      if (keyToPress) {
        if (modifiers.length > 0) {
          for (const m of modifiers) await keyboard.pressKey(m);
          await keyboard.pressKey(keyToPress);
          await keyboard.releaseKey(keyToPress);
          for (const m of reversedModifiers) await keyboard.releaseKey(m);
        } else {
          await keyboard.pressKey(keyToPress);
          await keyboard.releaseKey(keyToPress);
        }
      } else {
        // if we couldn't map to a Key, fall back to typing the key string (if present)
        if (data.key) {
          if (modifiers.length > 0) {
            for (const m of modifiers) await keyboard.pressKey(m);
            await keyboard.type(data.key);
            for (const m of reversedModifiers) await keyboard.releaseKey(m);
          } else {
            await keyboard.type(data.key);
          }
        } else {
          console.warn('Unknown key to press and no fallback text:', data);
        }
      }
    } catch (error) {
      console.error('handleKey error:', error);
    }
  }

  // Info window
  closeInfoWindow() {
    try {
      this.infoWindow?.close();
    } catch {}
  }

  showInfoWindow() {
    if (!this.electronService.isElectron) {
      window.open('http://localhost:4200/#/info-window', '_blank');
      return;
    }

    const appPath = this.electronService.remote.app.getAppPath();

    try {
      const BrowserWindow = this.electronService.remote.BrowserWindow;
      this.infoWindow = new BrowserWindow({
        height: 50,
        width: 50,
        x: 0,
        y: 100,
        resizable: false,
        show: false,
        frame: false,
        transparent: true,
        backgroundColor: '#252a33',
        webPreferences: {
          webSecurity: false,
          nodeIntegration: true,
          allowRunningInsecureContent: true,
          contextIsolation: false,
          enableRemoteModule: true,
        } as any,
      });

      this.electronService.remote
        .require('@electron/remote/main')
        .enable(this.infoWindow.webContents);

      this.infoWindow.setAlwaysOnTop(true, 'status');

      if (AppConfig.production) {
        const url = this.electronService.path.join(appPath, 'dist/index.html');
        this.infoWindow.loadURL(`file://${url}#/info-window`);
      } else {
        this.infoWindow.loadURL('http://localhost:4200/#/info-window');
      }

      this.infoWindow.show();
    } catch (error) {
      console.error('Error opening info window', error);
    }
  }
}

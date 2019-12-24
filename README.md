# imageCheck
Checks for validity of image source references in html files.

Does ***NOT*** work with dynamically referenced image links (which use variables to insert the filename).

Is based on file extensions, so can return false alarms. But it will not miss *any* mention of these following extensions: `.png` `.jpg` `.jpeg` `.gif` `.svg` `.webp` `.webm` `.mp4`

Download for:
  - [*Windows (x64)*](https://github.com/cyrusfirheir/imageCheck/releases/download/v0.1.1/win64.zip)
  - [*Windows (x86)*](https://github.com/cyrusfirheir/imageCheck/releases/download/v0.1.1/win32.zip)
  - [*macOS*](https://github.com/cyrusfirheir/imageCheck/releases/download/v0.1.1/macos.zip)
  - [*Linux*](https://github.com/cyrusfirheir/imageCheck/releases/download/v0.1.1/linux.zip)

##### The base file arrangement:

Run `index-win.exe` (or `index-linux` / `index-macos`) from here after placing your files in `/checker`.

![iC-01](https://imgur.com/ci8QIlJ.png)

##### Inside `/checker`:
![iC-02](https://imgur.com/nfPG9Vo.png)

##### Enter your html file name:

Press <kbd>⏎</kbd> to use default name (index.html).

![iC-03](https://imgur.com/O5cGkz5.png)

##### When every `<img src"path/to/image" />` is working fine:
![iC-04](https://imgur.com/A565bas.png)

##### When something's missing:
![iC-05](https://imgur.com/GSU1cgv.png)

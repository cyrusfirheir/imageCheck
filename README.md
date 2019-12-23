# imageCheck
Checks for validity of image source references in a html files which use the `<img src="./path/to/image">` tag explicitly in the markup.

Does ***NOT*** work with dynamically referenced image links and those contained within any other markup than a simple html `<img>` tag.

##### The base file arrangement:

Run Index-win (or `Index-linux` / `Index-macos`) from here after placing your files in `/checker`.

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

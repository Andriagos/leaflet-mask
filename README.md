## Leaflet Masking
Enabling user to mask the tile layer image with solid transparent color.
Ripped off from Leaflet gradient js.

## Usage

Just use :

```
L.tileLayer.Mask(url, options) 
```
instead of default :

```
L.tileLayer(url, options).
```

## Options
```
grayscale : boolean - do grayscaling conversion or not
maskColor : rgba - the mask color in rgba format with transparency
```

## License
do whatever you wish with it and dont forget to thansk Leaflet Gradient js author.

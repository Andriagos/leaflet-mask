/*
* L.TileLayer.Mask is a regular tilelayer with color masking.
* 
* Based from L.TileLayer.gradient
*/

L.TileLayer.Mask = L.TileLayer.extend({
        options : {
        enableCanvas : true,
        grayscale : false,
        maskColor : 'rgba(44, 52, 67, 0.8)'
      },

      initialize : function(url, options) {
        var canvasEl = document.createElement('canvas');
        if (!(canvasEl.getContext && canvasEl.getContext('2d'))) {
          options.enableCanvas = false;
        }

        L.TileLayer.prototype.initialize.call(this, url, options);
      },

      _loadTile : function(tile, tilePoint) {
        tile.setAttribute('crossorigin', 'anonymous');
        L.TileLayer.prototype._loadTile.call(this, tile, tilePoint);
      },

      _tileOnLoad : function() {
        if (this._layer.options.enableCanvas && !this.canvasContext) {
          var canvas = document.createElement("canvas");
          canvas.width = canvas.height = this._layer.options.tileSize;
          this.canvasContext = canvas.getContext("2d");
        }
        var ctx = this.canvasContext;

        if (ctx) {
          this.onload = null; // to prevent an infinite loop
          ctx.drawImage(this, 0, 0);
          var imgd = ctx.getImageData(0, 0, this._layer.options.tileSize,
              this._layer.options.tileSize);
          
          if (this._layer.options.grayscale) {
            var pix = imgd.data;
            for ( var i = 0, n = pix.length; i < n; i += 4) {
              pix[i] = pix[i + 1] = pix[i + 2] = (3 * pix[i] + 4 * pix[i + 1] + pix[i + 2]) / 8;
            }
          }
        
          ctx.putImageData(imgd, 0, 0);
          
          if (this._layer.options.maskColor) {
            ctx.rect(0, 0, this._layer.options.tileSize, this._layer.options.tileSize);
            ctx.fillStyle = this._layer.options.maskColor;
            ctx.fill();
          }
          
          this.removeAttribute("crossorigin");
          this.src = ctx.canvas.toDataURL();
        }

        L.TileLayer.prototype._tileOnLoad.call(this);
      }
    });

L.tileLayer.Mask = function(url, options) {
  return new L.TileLayer.Mask(url, options);
};
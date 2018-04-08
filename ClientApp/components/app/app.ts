import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as PIXI from 'pixi.js';

@Component({
    components: {
        MenuComponent: require('../navmenu/navmenu.vue.html')
    }
})

export default class AppComponent extends Vue {
    mounted() {
        var app = new PIXI.Application(2048, 1024, {
          backgroundColor: 0xcfd9a4,
          antialias: true
        });
        document.body.appendChild(app.view);
    
        var background = new PIXI.Container();
        var loader = PIXI.loader
          .add("layer1", "dist/images/Layer 1.png")
          .add("layer2", "dist/images/Layer 2.png")
          .add("layer3", "dist/images/Layer 3.png")
          .add("layer4", "dist/images/Layer 4.png")
          .add("layer5", "dist/images/Layer 5.png")
          .once("complete", function(loader, resources) {
            init();
          })
          .load();
    
        function init() {
          background.addChild(
            new PIXI.extras.TilingSprite(
              PIXI.loader.resources.layer1.texture,
              app.screen.width,
              PIXI.loader.resources.layer1.texture.height
            )
          );
          background.addChild(
            new PIXI.extras.TilingSprite(
              PIXI.loader.resources.layer2.texture,
              app.screen.width,
              PIXI.loader.resources.layer2.texture.height
            )
          );
          background.addChild(
            new PIXI.extras.TilingSprite(
              PIXI.loader.resources.layer3.texture,
              app.screen.width,
              PIXI.loader.resources.layer3.texture.height
            )
          );
          background.addChild(
            new PIXI.extras.TilingSprite(
              PIXI.loader.resources.layer4.texture,
              app.screen.width,
              PIXI.loader.resources.layer4.texture.height
            )
          );
          background.addChild(
            new PIXI.extras.TilingSprite(
              PIXI.loader.resources.layer5.texture,
              app.screen.width,
              PIXI.loader.resources.layer5.texture.height
            )
          );
    
          background.children[3].y =
            app.screen.height - (background.children[3] as any).height + 100;
          background.children[4].y =
            app.screen.height - (background.children[3] as any).height + 250;

        console.log(background.children[4]);
        }
    
        app.stage.addChild(background);
    
        // Listen for animate update
        app.ticker.add(function(delta) {
          for (var i = background.children.length - 1; i >= 0; i--) {
            (background.children[i] as any).tilePosition.x -= i * 2 * delta;
          }
        });
      }
      
  }
  
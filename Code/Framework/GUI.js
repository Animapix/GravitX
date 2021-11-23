const ALIGN_TYPE = {
    CENTER: "center",
    LEFT: "left",
    RIGHT: "right"
}

class Control extends Node{
    constructor(x,y){
        super(x,y);
        this.visible = true;
    }

    update(dt){
        super.update(ctx);
    }

    draw(ctx){  
        super.draw(ctx);
    }
}

class Panel extends Control {
    constructor(x,y,width = 200,height = 100,color = {r:255,g:255,b:255}){
        super(x,y);
        this.size = { width:width, height:height };
        this.color = color;
    }


    draw(ctx){
        ctx.fillStyle =  'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ')';
        ctx.rect(this.getGlobalPosition().x,this.getGlobalPosition().y,this.size.width,this.size.height);
        ctx.fill();
        this.drawChildren(ctx)
    }
}

class Label extends Panel {
    constructor(x,y, width, height ,text, font = "pixeled", fontSize = 16 ,color = {r:0,g:0,b:0}, align = ALIGN_TYPE.CENTER){
        super(x,y, width, height,color);
        this.font = font;
        this.fontSize = fontSize;
        this.align = align
        this.text = text;
    }

    draw(ctx){
        ctx.fillStyle =  'rgb(' + this.color.r + ',' + this.color.g + ',' + this.color.b + ')';
        ctx.textAlign = this.align ;
        ctx.font = this.fontSize +'px ' + this.font;

        let textMeasure = ctx.measureText(this.text);
        let x = 0;
        let y = this.size.height/2 + (textMeasure.fontBoundingBoxAscent + textMeasure.fontBoundingBoxDescent )/PIXEL_SCALE / 2;
        y += this.getGlobalPosition().y;

        switch (ctx.textAlign) {
            case 'left':
                x = this.getGlobalPosition().x;
                break;
            case 'right':
                x = this.getGlobalPosition().x + this.size.width;
                break;
            case 'center':
                x = this.getGlobalPosition().x + this.size.width/2;
                break;
            default:
                break;
        }
        ctx.fillText(this.text, x , y);
        this.drawChildren(ctx)
    }
}

class Menu extends Panel {
    constructor(x,y, width, height , font = "pixeled", fontSize = 8 ,color = {r:255,g:255,b:255}, align = ALIGN_TYPE.CENTER){
        super(x,y,width ,height ,color);
        this.font = font;
        this.fontSize = fontSize;
        this.align = align
        this.items = [];
        this.cursor = new Label(0,0,10,this.size.height,"-", this.font,this.fontSize,this.color,ALIGN_TYPE.RIGHT);
        this.addChild(this.cursor)
        this.cursorIndex = 0;
    }

    addItem(label, callback){
        let item = new Label(0,0,this.size.width,this.size.height,label, this.font,this.fontSize,this.color,this.align);
        this.addChild(item);
        this.items.push({label:item, callback:callback});
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i].label;
            item.position.y = this.size.height * i;
        }
    }

    draw(ctx){
        this.drawChildren(ctx);
    }

    next(){
        this.cursorIndex++;
        if(this.cursorIndex >= this.items.length){
            this.cursorIndex = 0;
        }
        this.cursor.position.y = this.size.height * this.cursorIndex;
    }

    previous(){
        this.cursorIndex--;
        if(this.cursorIndex < 0){
            this.cursorIndex =  this.items.length - 1;
        }
        this.cursor.position.y = this.size.height * this.cursorIndex;
    }

    select(){
        this.items[this.cursorIndex].callback();
    }
}
/* 
 * License: GPL v02 
 * author: nadeem.elahi@gmail.com,
 * http://webscripts.biz
 */
"use strict";
function Tel_inp_formatter($){

   var that = this;

   this.$telInput = $;

   this.idx; 

   this.numb 
      =['X','X','X','-',
	 'X','X','X','-',
	 'X','X','X','X'];

   this.digitRegex=/[0-9]/;

   this.numberRegex
      =/^\d{3}-\d{3}-\d{4}$/;


   var firstClick = 1;
   this.click_h=function(e){
      if(!e) var e = window.event;
      if(e.target !== that.$telInput) return;
      
      if(firstClick){
	 that.set_number_value();
	 that.highlight_first();
	 firstClick^=1;
      }
      that.highlight_right();
   };

   this.keyup_h=function(e){
      //e.key; e.keyCode;
      if(!e) var e = window.event;
      if(e.target !== that.$telInput) return;

      if(e.keyCode===39){//e.key==ArrowRight
	 that.highlight_right();
      }else if(e.keyCode===37){//e.key==ArrowLeft
	 that.highlight_left();
      }else if(e.keyCode===46){//e.key==DELETE
	 that.set_idx_right();
      }else if(e.keyCode===8){//e.key==BACKSPACE
	 that.set_idx_left();
      }else if(that.digitRegex.test(e.key)){
	 that.numb[that.idx]=e.key;
	 that.set_number_value();
	 that.idx++;
	 if(that.idx===12 && 
	    that.numberRegex
	    .test(that.$telInput.value)){

	       that.$telInput.blur();

	 }
	 else that.skip_dash_right();
	 that.highlight_idx();
      }

   };
}

Tel_inp_formatter
   .prototype
   .highlight_first
   =function(){
      this.idx=0;
      this.$telInput
	 .setSelectionRange(0,1);
   };

Tel_inp_formatter
   .prototype
   .set_number_value
   =function(){
      this.$telInput.value  
	 =this.numb.join("");
   };

Tel_inp_formatter
   .prototype
   .highlight_idx
   =function(){
      this.$telInput
	 .setSelectionRange(
	    this.idx,this.idx+1);
   };

Tel_inp_formatter
   .prototype
   .skip_dash_right
   =function(){
      if(this.idx>11)this.idx=11;
      else if(this.idx===3
	 ||this.idx===7)this.idx++;
   };

Tel_inp_formatter
   .prototype
   .skip_dash_left
   =function(){
      //console.log('skip_dash_left: ' + idx);
      if(this.idx===3
	 ||this.idx===7)this.idx--;
   };

Tel_inp_formatter
   .prototype
   .highlight_right
   =function(){
      //e.key==ArrowRight
      this.idx=this.$telInput
	 .selectionStart;

      if(this.idx===12) this.idx--;
      else this.skip_dash_right();
      this.highlight_idx();
   };

Tel_inp_formatter
   .prototype
   .highlight_left
   =function(){
      //e.key==ArrowLeft
      this.idx=this.$telInput
	 .selectionStart;
      this.idx--;
      if(this.idx<0) this.idx=0;
      else this.skip_dash_left();
      this.highlight_idx();
      //console.log("highlight_left() idx: " + idx);
   };

Tel_inp_formatter
   .prototype
   .set_idx_right
   =function(){
      this.idx++;
      this.skip_dash_right();
      this.numb[this.idx]= 'X'; 
      this.set_number_value();
      this.highlight_idx();
   };

Tel_inp_formatter
   .prototype
   .set_idx_left
   =function(){
      this.idx--;
      if(this.idx<0) this.idx=0;
      else this.skip_dash_left();
      this.numb[this.idx]= 'X'; 
      //console.log("numb: " +numb);
      this.set_number_value();
      //console.log('set_idx_left: ' +idx);
      this.highlight_idx();
   };

function setupTIFs(TIFsClassName){
   var i,l,
      allTIFs=[],
      allTIFnodes
      =document
      .getElementsByClassName(
	 TIFsClassName);

   l=allTIFnodes.length;

   for(i=0;i<l;i++){

      allTIFs[i]
	 =new Tel_inp_formatter(
	    allTIFnodes[i]
	 );

      document.body
      .addEventListener(
	 "click",
	 allTIFs[i].click_h,
	 false);

      document.body
      .addEventListener(
	 "keyup",
	 allTIFs[i].keyup_h,
	 false);
   }
}

//window["Tel_inp_formatter"]=Tel_inp_formatter;
//window["setupTIFs"]=setupTIFs;
//
//exports for closure compiler



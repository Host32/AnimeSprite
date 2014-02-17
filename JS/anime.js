/* Classe para execução de animações 2D a partir de sprites com javascript
 * Author: Ivan Miranda
 * Esse código é disponibilizado para auxiliar criações de jogos de navegador baseados em javascript.
 * Livre para uso, edite, melhore e compartilhe!
*/ 

//definição da classe
function anime(options){
	d = new Date();
	if(typeof options != 'undefined'){
		this.options = {
			patch : options.patch,
			frameWidth : options.frameWidth,
			frameHeight: options.frameHeight,
			animacoes: options.animacoes,
			framesPorAnimacao: options.framesPorAnimacao,
			container: options.container,
			classe : options.classe,
			id     : options.id,
			tempoPorFrame: options.tempoPorFrame
		}
	}
	else this.options = {
		patch : "",
		frameWidth : 0,
		frameHeight: 0,
		animacoes: 1,
		framesPorAnimacao: 1,
		container: 'body',
		classe : null,
		id     : (d.getTime() + Math.floor((Math.random()*1000)+1)),
		tempoPorFrame: 50
	};
	
	this.frameAtual = 1;
	this.animacaoAtual = 1;
	this.flip = false;
	this.animacao = null;
	
	this.setPatch = function(patch){
		this.options.patch = patch;
	}
	this.setFrameSize = function(width, height){
		this.options.frameWidth = width;
		this.options.frameHeight = height;
	}
	
	this.setContainer = function(container){
		this.options.container = container;
	}
	
	this.setSizeOfAnimate = function(animacoes,framesPorAnimacao){
		this.options.animacoes = animacoes;
		this.options.framesPorAnimacao = framesPorAnimacao;
	}
	
	this.setClass = function(clasee){
		this.options.classe = classe;
	}
	
	this.setId = function(id){
		this.options.id = id;
	}
	
	this.append = function(){
		$(this.options.container).append(this.generate());
	}
	this.generate = function(){
		var pos = this.getPositionOfAnimate();
		return $('<DIV>')
			.addClass(this.options.classe)
			.attr('id',this.options.id)
			.css('display','block')
			.css('position','absolute')
			.css('width',this.options.frameWidth)
			.css('height',this.options.frameHeight)
			.css('background','url("'+this.options.patch+'")')
			.css('background-position',pos.x+'px '+pos.y+'px')
	}
	this.updateFrame = function(){
		this.options = this.options;
		this.frameAtual += 1;
		if(this.frameAtual>this.options.framesPorAnimacao)
			this.frameAtual = 1;
	}
	this.stop = function(){
		this.frameAtual = 0;
	}
	
	this.setAnimacao = function(a,invertidoHorizontalmente){
		this.animacaoAtual = a;
		this.flip = (invertidoHorizontalmente)?true:false;
	}
	
	this.getPositionOfAnimate = function(){
		var hx = (this.frameAtual-1)*this.options.frameWidth;
		var hy = (this.animacaoAtual-1)*this.options.frameHeight;
		return { x: hx, y: -hy};
	}
}
function animeUpdateFrame(animacao){
	var pos = animacao.getPositionOfAnimate();
	
	$('#'+animacao.options.id).css('background-position',pos.x+'px '+pos.y+'px');
	
	if(animacao.flip){
		$('#'+animacao.options.id)
			.css('-moz-transform','scaleX(-1)')
			.css('-o-transform','scaleX(-1)')
			.css('-webkit-transform','scaleX(-1)')
			.css('transform','scaleX(-1)')
			.css('filter','FlipH')
			.css('-ms-filter','"FlipH"')
	}
	else{
		$('#'+animacao.options.id)
		.css('-moz-transform','scaleX(1)')
		.css('-o-transform','scaleX(1)')
		.css('-webkit-transform','scaleX(1)')
		.css('transform','scaleX(1)')
		.css('filter','')
		.css('-ms-filter','')
	}
}

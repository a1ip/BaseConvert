calculate = function(){
	var e = document.getElementById("selectBase");
	var userBase = e.options[e.selectedIndex].value;
	var userValue = document.getElementById("value").value;
	var allBases = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,20];
	assert(checkInput(userValue,userBase),'wrong input');
	allBases.forEach(function(toBase){
		var outStr = 'b' + toBase.toString() + 'Output';
		window[outStr].value = fromBase10(toBase10(userValue, userBase),toBase);
	})
};

function AssertionMessage(message){
	this.message = message;
};

AssertionMessage.prototype = Object.create(Error.prototype);

function assert(test,message){
	if(!test){
		throw new AssertionMessage(message);
	}
};

checkInput = function(n, base){
	var out = true;
	var chars = "0123456789abcdefghij".toUpperCase().split('');
	chars = chars.slice(0, base);
	var nArray = n.toString().split('');
	nArray.forEach(function(i){
		if(chars.indexOf(i.toUpperCase()) == -1){
			out = false;
		}
	})
	return out;
};

reverse = function(val){
	val = val + "";
	return val.split("").reverse().join("");
};

toBase10 = function(n, fromBase){
	var chars = "0123456789abcdefghij".toUpperCase().split('');
	var nOut = 0;
	var nArray = reverse(n).split('');
	for (var i = 0; i < nArray.length; i++){
		nOut += chars.indexOf(nArray[i]) * Math.pow(fromBase,i);
	}
	return nOut
};

fromBase10 = function(n, toBase){
	var chars = "0123456789abcdefghij".toUpperCase().split('');
	var len = greatestRoot(n, toBase) + 1;
	var nOut = [];
	for (var i = len-1; i >= 0; i--){	
		var x = Math.floor(n / Math.pow(toBase, i)) || 0;
		nOut.push(chars[x]);
		if(x > 0){
			n -= Math.pow(toBase, i) * x;
		}
	}
	return nOut.join('');
};

greatestRoot = function(n, base){
	var exp = 1; 
	function findIt(n, base, exp){
		if(Math.pow(base,exp) > n){
			return exp - 1	
		} else {
			return findIt(n, base, exp+1)
		}
	}
	return findIt(n, base, exp)
};
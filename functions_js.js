///////////////////////////////////////////////////////////////////////////////////////////
//Script PHP/MYSQL de gestion de petites annonces développé par Script PAG
//Script PAG tout droits réservé. Utilisation sous licence. http://www.script-pag.com
///////////////////////////////////////////////////////////////////////////////////////////

//############################################################

////////////////////////////////
//Fonctions affichage des régions et de l'info bulle sur la carte
////////////////////////////////

function MapReg(id_reg)
{
	document.getElementById('map_region').style.background = 'url(images/map/carte'+ id_reg +'.png) no-repeat';
}

function MapRegBulle(nom_reg, nb_ann, texte, e)
{
	if (!e) var e = window.event;
	
	var obj = document.getElementById('bulle');
	
	obj.style.display = 'block';
	obj.innerHTML = '<span class="tx_reg_bulle">'+ nom_reg +'</span><br /><span class="tx_bulle">'+ nb_ann +'</span> <span class="tx_bulle">'+ texte +'</span>';
	
	var st = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	
	if (navigator.userAgent.toLowerCase().indexOf('safari') >= 0) st = 0; 
	
	if (e.pageX || e.pageY) {
		posx = e.pageX;
		posy = e.pageY;
	}
	else if (e.clientX || e.clientY) {
		posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop 	+ document.documentElement.scrollTop;
	}
	
	var leftPos = posx - 40;
	
	if (leftPos < 0) leftPos = 0;
	
	obj.style.left = leftPos + 'px';
	obj.style.top = posy - obj.offsetHeight - 3 + 'px';
}

function MapRegSup()
{
	document.getElementById('map_region').style.background = 'none';
	document.getElementById('bulle').style.display = 'none';
}

////////////////////////////////
//Fonction affichage des radios
////////////////////////////////

function turnImgRadio(objRadio, num)
{
    var t_img = document.getElementById('conteneurRadio'+ num).getElementsByTagName('img');

    for (var i = 0; i < t_img.length; i++)
    {
        t_img[i].src = 'images/radio1.png';
    }
    
    var img = document.getElementById('img_radio_' + objRadio.id);
    img.src = 'images/radio2.png';
}

////////////////////////////////
//Fonction affichage des checkbox
////////////////////////////////

function turnImgCheck(objCheck)
{
	var img = document.getElementById('img_check_' + objCheck.id);
	var t = img.src.split('/');
	img.src = (t[t.length-1] == 'check2.png') ? 'images/check1.png' : 'images/check2.png';
}

////////////////////////////////
//Fonction ajout aux favoris
////////////////////////////////

function Favoris(title, url) 
{
	if (navigator.appName != 'Microsoft Internet Explorer')
	{ 
		window.sidebar.addPanel(title, url, ''); 
	}
	else 
	{
		window.external.AddFavorite(url, title); 
	} 
}

////////////////////
//Fonction texte intput
////////////////////

function InputCon(input, txt)
{
	if (input.value == txt) 
	{	
		input.value = '';
	}
	else if (input.value == '')
	{
		input.value = txt;
	}
}

////////////////////////////////
//Fonction affichage du nom d'entreprise et siret pour les professionnel
////////////////////////////////

function GetPro(val, nom_ent, num_sir, info)
{
	if (val == 2) document.getElementById('get_pro').innerHTML = '<p class="form_left"><label for="ent">'+ nom_ent +' :</label></p><p class="form_right_select"><input type="text" id="ent" class="long_input" name="ent" value=""></p><p class="form_left"><label for="sir">'+ num_sir +' :</label></p><p class="form_right_select"><input type="text" id="sir" class="long_input" name="sir" value=""> &nbsp;<span class="info_form">'+ info +'</span></p> ';
	
	else document.getElementById('get_pro').innerHTML = '';
}

////////////////////////////////
//Fonction prix de l'annonce
////////////////////////////////

function PrixAnnonce(prix_annonce, prix_une, prix_urg, prix_enc)
{
	document.getElementById('prix_annonce').innerHTML=prix_annonce;
	
	if(prix_une != 0)
		document.getElementById('prix_une').innerHTML=prix_une;
	
	if(prix_urg != 0)
		document.getElementById('prix_urg').innerHTML=prix_urg;
	
	if(prix_enc != 0)
		document.getElementById('prix_enc').innerHTML=prix_enc;
}

////////////////////////////////
//Fonction affichage des départements pour la recherche
////////////////////////////////

function GetDepartements() 
{
	var get_departements = document.getElementById('get_departements');
	var value_dep = document.getElementById('dep').value;
	var xhr_object = null;

	if (window.XMLHttpRequest) 
		xhr_object = new XMLHttpRequest();
		
	else if (window.ActiveXObject) 
		xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
		
	else 
	{
		alert("Votre navigateur ne prend pas en charge certaines applications de notre site internet, merci de changer de navigateur pour utiliser notre site.");
		return;
	}

	xhr_object.open("POST", "./includes/display/search_departements.php", true);

	xhr_object.onreadystatechange = function() 
	{
		if (xhr_object.readyState == 4) 
		{
			get_departements.innerHTML = xhr_object.responseText;
		}
	}

	xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	var data = "dep=" + value_dep;
	xhr_object.send(data);
}

////////////////////////////////
//Fonction affichage des options pour la recherche
////////////////////////////////

function GetOptions() 
{
	var get_options = document.getElementById('get_options');
	var value_opt = document.getElementById('opt').value;
	var xhr_object = null;

	if (window.XMLHttpRequest) 
		xhr_object = new XMLHttpRequest();
		
	else if (window.ActiveXObject) 
		xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
		
	else 
	{
		alert("Votre navigateur ne prend pas en charge certaines applications de notre site internet, merci de changer de navigateur pour utiliser notre site.");
		return;
	}

	xhr_object.open("POST", "./includes/display/search_options.php", true);

	xhr_object.onreadystatechange = function() 
	{
		if (xhr_object.readyState == 4) 
		{
			get_options.innerHTML = xhr_object.responseText;
		}
	}

	xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	var data = "opt=" + value_opt;
	xhr_object.send(data);
}

////////////////////////////////
//Fonction affichage des départements pour le dépot d'une annonce
////////////////////////////////

function DisplayDepartements()
{
	var display_departements = document.getElementById('display_departements');
	var value_dep = document.getElementById('form_dep').value;
	var xhr_object = null;

	if (window.XMLHttpRequest) 
		xhr_object = new XMLHttpRequest();
		
	else if (window.ActiveXObject) 
		xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
		
	else 
	{
		alert("Votre navigateur ne prend pas en charge certaines applications de notre site internet, merci de changer de navigateur pour utiliser notre site.");
		return;
	}

	xhr_object.open("POST", "./includes/display/form_departements.php", true);

	xhr_object.onreadystatechange = function() 
	{
		if (xhr_object.readyState == 4) 
		{
			display_departements.innerHTML = xhr_object.responseText;
		}
	}

	xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	var data = "form_dep=" + value_dep;
	xhr_object.send(data);
}

////////////////////////////////
//Fonction affichage des options pour le dépot d'une annonce
////////////////////////////////

function DisplayOptions() 
{
	var options_form = document.getElementById('options_form');
	var value_opt = document.getElementById('options').value;
	var xhr_object = null;

	if (window.XMLHttpRequest) 
		xhr_object = new XMLHttpRequest();
		
	else if (window.ActiveXObject) 
		xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
		
	else 
	{
		alert("Votre navigateur ne prend pas en charge certaines applications de notre site internet, merci de changer de navigateur pour utiliser notre site.");
		return;
	}

	xhr_object.open("POST", "./includes/display/form_options.php", true);

	xhr_object.onreadystatechange = function() 
	{
		if (xhr_object.readyState == 4) 
		{
			options_form.innerHTML = xhr_object.responseText;
		}
	}

	xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	var data = "options=" + value_opt;
	xhr_object.send(data);
}

////////////////////////////////
//Fonction affichage du commentaire dans le formulaire
////////////////////////////////

function DisplayComment() 
{
	var commentaire_form = document.getElementById('commentaire');
	var value_opt = document.getElementById('options').value;
	var xhr_object = null;

	if (window.XMLHttpRequest) 
		xhr_object = new XMLHttpRequest();
		
	else if (window.ActiveXObject) 
		xhr_object = new ActiveXObject("Microsoft.XMLHTTP");
		
	else 
	{
		alert("Votre navigateur ne prend pas en charge certaines applications de notre site internet, merci de changer de navigateur pour utiliser notre site.");
		return;
	}

	xhr_object.open("POST", "./includes/display/form_comment.php", true);

	xhr_object.onreadystatechange = function() 
	{
		if (xhr_object.readyState == 4) 
		{
			commentaire_form.innerHTML = xhr_object.responseText;
		}
	}

	xhr_object.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	var data = "options=" + value_opt;
	xhr_object.send(data);
}

////////////////////////////////
//Fonction affichage des photos
////////////////////////////////

function photos(photo)
{
	document.getElementById('photo').src = 'images/photos/'+ photo;
}
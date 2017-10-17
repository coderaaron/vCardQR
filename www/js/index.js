/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var generateButton = document.getElementById("generateButton");
var qrcode = new QRCode("qrcode", {
    text: '',
    width: 330,
    height: 330,
});

var app = {
	// Application Constructor
	initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
		generateButton.addEventListener("click", this.onDeviceReady.bind(this), false);
		
	},

	// deviceready Event Handler
	//
	// Bind any cordova events here. Common events are:
	// 'pause', 'resume', etc.
	onDeviceReady: function() {
	   navigator.contacts.pickContact( this.createVcard, this.onError );
	},

	/*
	function (id, displayName, name, nickname, phoneNumbers, emails, addresses,
	    ims, organizations, birthday, note, photos, categories, urls) {
	    this.id = id || null;
	    this.rawId = null;
	    this.displayName = displayName || null;
	    this.name = name || null; // ContactName
	    this.nickname = nickname || null;
	    this.phoneNumbers = phoneNumbers || null; // ContactField[]
	    this.emails = emails || null; // ContactField[]
	    this.addresses = addresses || null; // ContactAddress[]
	    this.ims = ims || null; // ContactField[]
	    this.organizations = organizations || null; // ContactOrganization[]
	    this.birthday = birthday || null;
	    this.note = note || null;
	    this.photos = photos || null; // ContactField[]
	    this.categories = categories || null; // ContactField[]
	    this.urls = urls || null; // ContactField[]
	}
	 */

	createVcard: function(contact) {
		console.log(contact);

		var d = new Date();
		var n = d.toISOString();

		var vcardString = 'BEGIN:VCARD\n';
		vcardString += 'VERSION:3.0\n';
		vcardString += 'N:'+contact.name.familyName+';'+contact.name.givenName+';'+contact.name.honorificSuffix+';'+contact.name.honorificPrefix+';\n';
		vcardString += 'FN:'+contact.name.formatted+'\n';

		if ( contact.phoneNumbers != null ) {
			phoneString = '';
			for (var i = 0; i < contact.phoneNumbers.length; i++) {
				var rawPhone = contact.phoneNumbers[i].value;
				phoneString += 'TEL;TYPE='+contact.phoneNumbers[i].type+':'+rawPhone.replace(/\D/g,'')+'\n';
			}
			vcardString += phoneString;
		}
		
		if ( contact.addresses != null) {
			var addressString = '';
			for (var i = 0; i < contact.addresses.length; i++) {
				addressString += 'ADR;TYPE='+contact.addresses[i].type+';PREF:;;'+contact.addresses[i].streetAddress+';'+contact.addresses[i].locality+';'+contact.addresses[i].region+';'+contact.addresses[i].postalCode+';'+contact.addresses[i].country+'\n';
			}
			vcardString += addressString;
		}
		
		if ( contact.emails != null ) {
			var emailString = '';
			for (var i = 0; i < contact.emails.length; i++) {
				emailString += 'EMAIL:'+contact.emails[i].value+'\n';
			}
			vcardString += emailString;
		}
		
		vcardString += 'REV:'+n+'\n';
		vcardString += 'END:VCARD';

		qrcode.clear();
		qrcode.makeCode(vcardString);
	},

	onError: function(contactError) {
		alert('Error: '+contactError);
	}

};

app.initialize();










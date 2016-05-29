var state = {
    tabs: {
        tabNames: {
            tabQuickReports:"",
            tabMyFolders:"",
            tabMyTeamFolders:"",
            tabPublicFolders:""
        }
    },
    quickReports: {
        inputNames: {
            quickReportsReport1Name: "",
            quickReportsReport2Name: "",
            quickReportsReport3Name: ""
        },
        inputUrls: {
            quickReportsReport1Url: "",
            quickReportsReport2Url: "",
            quickReportsReport3Url: ""
        }
    },
    myTeamFolders: {
        inputNames: {
            myTeamFoldersReport1Name: "",
            myTeamFoldersReport2Name: "",
            myTeamFoldersReport3Name: ""
        },
        inputUrls: {
            myTeamFoldersReport1Url: "",
            myTeamFoldersReport2Url: "",
            myTeamFoldersReport3Url: ""
        }
    }
}

// Display focused tab

var tabs = document.querySelectorAll('.tab');
for (var i=0; i<tabs.length; i++) {
    var tabId = tabs[i].id;
    tabs[i].value = state.tabs.tabNames[tabId]
}

for (var i=0 ; i<tabs.length; i++){
    tabs[i].addEventListener('click', tabFocus.bind(this, tabs[i].id));
};
function tabFocus(id, e) {
    for(var i=0 ; i<tabs.length; i++){
        if(tabs[i].id !== id){
            tabs[i].className = 'tab';
        }
        else {
            tabs[i].className = 'tab active-tab';
        }
    }
};

// Form validation + Select tag input

var reportsForm = document.querySelector('#form1');
reportsForm.addEventListener('submit', formValidate);
function formValidate (e) {
    e.preventDefault();
    var nameFields = document.querySelectorAll('.quick-reports-input-name');
    var urlFields = document.querySelectorAll('.quick-reports-input-url');
    for (var i=0; i<nameFields.length; i++) {
        if (nameFields[i].value === "") {
            nameFields[i].className = 'quick-reports-input-name active-field';
            nameFields[i].required = true;
            return;
        }
        else if (urlFields[i].value === "") {
            nameFields[i].className = 'quick-reports-input-name';
            urlFields[i].className = 'quick-reports-input-url active-field';
            urlFields[i].required = true;
            urlFields[i].type = 'url';
            urlFields[i].focus();
            return;
        }
        else {
            var nameFieldId = nameFields[i].id;
            state.quickReports.inputNames[nameFieldId] = nameFields[i].value;
            document.querySelectorAll('.reportsSelect')[i].text = nameFields[i].value;
            var urlFieldId = urlFields[i].id;
            state.quickReports.inputUrls[urlFieldId] = urlFields[i].value;
            document.querySelectorAll('.reportsSelect')[i].value = urlFields[i].value;
            urlFields[i].className = 'quick-reports-input-url';
            document.querySelector('#reportsSelectList').className = 'select active-select';
        }
    }
}

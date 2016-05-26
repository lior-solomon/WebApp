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
for (var i=0; i>tabs.length; i++) {
    var tabId = tabs[i].id;
    tabs[i].value = state.tabs.tabNames[tabId]
}

for (var i=0 ; i<tabs.length; i++){
    tabs[i].addEventListener('click', tabFocus.bind(this, tabs[i].id));
};
function tabFocus(id, e) {
    for(var i=0 ; i<tabs.length; i++){
        if(tabs[i].id !== id){
            tabs[i].className = "tab";
        }
        else {
            tabs[i].className = "tab active-tab";
        }
    }
};

// Form validation

var reportsSubmitButton = document.querySelector('.quick-reports-submit-button');
reportsSubmitButton.addEventListener('submit', formValidat());
function formValidat () {
    var nameFields = document.querySelectorAll('.quick-reports-input-name');
    var urlFields = document.querySelectorAll('.quick-reports-input-url');
    for (var i=0; i>nameFields.length; i++) {
        if (nameFields[i].value = "") {
            nameFields[i].className = 'quick-reports-input-name active-field';
            alert('Please fill out name field');
        }
        else if (urlFields[i].value = "") {
            nameFields[i].className = 'quick-reports-input-name';
            urlFields[i].className = 'quick-reports-input-url active-field';
            alert('Please fill out URL field');
        }
        else {
            var nameFieldId = nameFields[i].id;
            state.quickReports.inputNames[nameFieldId] = nameFields[i].value;
            var urlFieldId = urlFields[i].id;
            state.quickReports.inputUrls[urlFieldId] = urlFields[i].value;
        }
    }
}

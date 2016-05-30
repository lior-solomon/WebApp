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
}
function tabFocus(id, e) {
    for(var i=0 ; i<tabs.length; i++){
        if(tabs[i].id !== id){
            tabs[i].className = 'tab';
        }
        else {
            tabs[i].className = 'tab active-tab';
        }
    }
}

// Form validation + Select tag input

var reportsForm1= document.querySelector('#form1');
reportsForm1.addEventListener('submit', form1Validate);
function form1Validate (e) {
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
var reportsForm2 = document.querySelector('#form2');
reportsForm2.addEventListener('submit', form2Validate);
function form2Validate (e) {
    e.preventDefault();
    var nameFields = document.querySelectorAll('.my-team-folders-input-name');
    var urlFields = document.querySelectorAll('.my-team-folders-input-url');
    for (var i = 0; i < nameFields.length; i++) {
        if (nameFields[i].value === "") {
            nameFields[i].className = 'my-team-folders-input-name active-field';
            nameFields[i].required = true;
            return;
        }
        else if (urlFields[i].value === "") {
            nameFields[i].className = 'my-team-folders-input-name';
            urlFields[i].className = 'my-team-folders-input-url active-field';
            urlFields[i].required = true;
            urlFields[i].type = 'url';
            urlFields[i].focus();
            return;
        }
        else {
            var nameFieldId = nameFields[i].id;
            state.myTeamFolders.inputNames[nameFieldId] = nameFields[i].value;
            document.querySelectorAll('.foldersSelect')[i].text = nameFields[i].value;
            var urlFieldId = urlFields[i].id;
            state.myTeamFolders.inputUrls[urlFieldId] = urlFields[i].value;
            document.querySelectorAll('.foldersSelect')[i].value = urlFields[i].value;
            urlFields[i].className = 'my-team-folders-input-url';
            document.querySelector('#foldersSelectList').className = 'select active-select';
        }
    }
}

// Select tag to iframe and back again

function reportsShowSite () {
    var currentSelect = document.querySelector("#reportsSelectList");
    document.querySelector('#quickReportsForm').className = 'quick-reports-form form-inactive';
    document.querySelector('#reportsSettingsImg').className = 'no-back-color';
    document.querySelector('#reportsIframe').className = 'iframe-active';
    document.querySelector('#reportsIframe').src = currentSelect.options[currentSelect.selectedIndex].value;
}
function reportsRestoreForm () {
    document.querySelector('#reportsIframe').className = 'reports-iframe';
    document.querySelector('#quickReportsForm').className = 'quick-reports-form';
    document.querySelector('#reportsSettingsImg').className = 'settings';
}
function foldersShowSite () {
    var currentSelect = document.querySelector("#foldersSelectList");
    document.querySelector('#myTeamFoldersForm').className = 'my-team-folders-form form-inactive';
    document.querySelector('#foldersSettingsImg').className = 'no-back-color';
    document.querySelector('#foldersIframe').className = 'iframe-active';
    document.querySelector('#foldersIframe').src = currentSelect.options[currentSelect.selectedIndex].value;
}
    function foldersRestoreForm () {
    document.querySelector('#foldersIframe').className = 'folders-iframe';
    document.querySelector('#myTeamFoldersForm').className = 'my-team-folders-form';
    document.querySelector('#foldersreportsSettingsImg').className = 'settings';

}


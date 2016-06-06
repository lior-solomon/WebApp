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

// Local storage

var stateStorage = JSON.parse(localStorage.getItem('saveState'));
restoreForm ();
function restoreForm () {
    var nameFields1 = document.querySelectorAll('.quick-reports-input-name');
    var urlFields1 = document.querySelectorAll('.quick-reports-input-url');
    //var nameFields2 = document.querySelectorAll('.my-team-folders-input-name');
    //var urlFields2 = document.querySelectorAll('.my-team-folders-input-url');
    for (var i=0; i<nameFields1.length; i++) {
        var nameField1Id = nameFields1[i].id;
        nameFields1[i].value = stateStorage.quickReports.inputNames[nameField1Id];
        var urlField1Id = urlFields1[i].id;
        urlFields1[i].value = stateStorage.quickReports.inputUrls[urlField1Id];
        //var nameField2Id = nameFields2[i].id;
        //nameFields2[i].value = stateStorage.myTeamFolders.inputNames[nameField2Id];
        //var urlField2Id = urlFields2[i].id;
        //urlFields2[i].value = stateStorage.myTeamFolders.inputUrls[urlField2Id];
    }
}

//Auto display tab

document.querySelector("body").onload = function () {showFirstTab()};
function showFirstTab () {
    document.querySelector("#quickReports").className = 'show-div';
}

 //Display focused tab

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
            localStorage.setItem('saveState', JSON.stringify(state));
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
            //localStorage.setItem('saveState', JSON.stringify(state));
            urlFields[i].className = 'my-team-folders-input-url';
            document.querySelector('#foldersSelectList').className = 'select active-select';
        }
    }
}

// Select tag to iframe and back

function reportsShowSite () {
    var currentSelect = document.querySelector("#reportsSelectList");
    document.querySelector('#reportsSettingsImg').className = 'no-back-color';
    document.querySelector('#quickReportsForm').className = 'quick-reports-form form-inactive';
    document.querySelector('#reportsIframe').className = 'iframe-active';
    document.querySelector('#reportsIframe').src = currentSelect.options[currentSelect.selectedIndex].value;
    document.querySelector('#reportsIframeLink').href = currentSelect.options[currentSelect.selectedIndex].value;
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
    document.querySelector('#foldersIframeLink').href = currentSelect.options[currentSelect.selectedIndex].value;
}
function foldersRestoreForm () {
    document.querySelector('#foldersIframe').className = 'folders-iframe';
    document.querySelector('#myTeamFoldersForm').className = 'my-team-folders-form';
    document.querySelector('#foldersreportsSettingsImg').className = 'settings';

}

 // search - notifications - iframe

document.querySelector('#searchBox').addEventListener('submit', searchLocal);
function searchLocal(e) {
    e.preventDefault();
    var reportsOptions = document.querySelector('#reportsSelectList')
    for (i=1; i<reportsOptions.length; i++) {
        if (document.querySelector('#searchInput').value === reportsOptions[i].innerText) {
            document.querySelector('#reportsSettingsImg').className = 'no-back-color';
            document.querySelector('#quickReportsForm').className = 'quick-reports-form form-inactive';
            document.querySelector('#reportsIframe').className = 'iframe-active';
            document.querySelector('#reportsIframe').src = reportsOptions[i].value;
            document.querySelector('#notifications').textContent = 'Searched phrase' + ' \"' +
            reportsOptions[i].innerText + '\" ' + 'found on local links list and is now presented below in iframe';
        }
        else {
            document.querySelector('#notifications').textContent = 'Searched phrase not found'
        }
    }
    var foldersOptions = document.querySelector('#foldersSelectList')
    for (i=1; i<foldersOptions.length; i++) {
        if (document.querySelector('#searchInput').value === foldersOptions[i].innerText) {
            document.querySelector('#foldersSettingsImg').className = 'no-back-color';
            document.querySelector('#myTeamFoldersForm').className = 'my-team-folders-form form-inactive';
                document.querySelector('#foldersIframe').className = 'iframe-active';
            document.querySelector('#foldersIframe').src = foldersOptions[i].value;
            document.querySelector('#notifications').textContent = 'Searched phrase' + ' \"' +
            foldersOptions[i].innerText + '\" ' + 'found on local links list and is now presented below in iframe';
        }
        else {
            document.querySelector('#notifications').textContent = 'Searched phrase not found'
        }
    }
}

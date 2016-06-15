// Object literal notation for variable data storage

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
};

// Reset state object from local storage

if (localStorage.getItem('saveState') === null) {
    document.querySelector('#tabQuickReports').className = 'active-tab';
}
else {
    state = JSON.parse(localStorage.getItem('saveState'));
}

//Restore focused tab from local storage

tabManagement();
function tabManagement () {
    var tabs = document.querySelectorAll('.tab');
    var tabDivs = document.querySelectorAll('.tab-div');
    restoreTabFocus();
    function restoreTabFocus () {
        for(var i=0 ; i<tabs.length; i++) {
          tabs[i].className = state.tabs.tabNames[tabs[i].id];
            if (state.tabs.tabNames[tabs[i].id] === 'active-tab') {
                tabDivs[i].className = 'tab-div show-div';
            }
        }
    }

//Display clicked tab

    for (var i=0 ; i<tabs.length; i++){
        tabs[i].addEventListener('click', tabFocus.bind(this, tabs[i].id));
    }
    function tabFocus(id) {
        document.querySelector('#tabQuickReports').className = 'tab';
        for(var i=0; i<tabs.length; i++){
            if(tabs[i].id === id){
                tabs[i].className = 'active-tab';
                tabDivs[i].className = 'tab-div show-div';
                state.tabs.tabNames[tabs[i].id] = 'active-tab';
                localStorage.setItem('saveState', JSON.stringify(state));
            }
            else {
                tabs[i].className = 'tab';
                tabDivs[i].className = 'tab-div hide-divs';
                state.tabs.tabNames[tabs[i].id] = 'tab';
                localStorage.setItem('saveState', JSON.stringify(state));
            }
        }
    }
}

// Restore form values from local storage

restoreForm ();
function restoreForm () {
    var reportsNameFields = document.querySelectorAll('.quick-reports-input-name');
    var reportsUrlFields = document.querySelectorAll('.quick-reports-input-url');
    var foldersNameFields = document.querySelectorAll('.my-team-folders-input-name');
    var foldersUrlFields = document.querySelectorAll('.my-team-folders-input-url');
    for (var i = 0; i < reportsNameFields.length; i++) {
        var reportsNameFieldId = reportsNameFields[i].id;
        reportsNameFields[i].value = state.quickReports.inputNames[reportsNameFieldId];
        var reportsUrlFieldId = reportsUrlFields[i].id;
        reportsUrlFields[i].value = state.quickReports.inputUrls[reportsUrlFieldId];
        var foldersNameFieldId = foldersNameFields[i].id;
        foldersNameFields[i].value = state.myTeamFolders.inputNames[foldersNameFieldId];
        var foldersUrlFieldId = foldersUrlFields[i].id;
        foldersUrlFields[i].value = state.myTeamFolders.inputUrls[foldersUrlFieldId];
    }
}

// Forms validations + Select tags input

formEventListener1();
function formEventListener1 () {
    var reportsForm1= document.querySelector('#form1');
    reportsForm1.addEventListener('submit', form1Validate);
    function form1Validate (e) {
        e.preventDefault();
        var nameFields = document.querySelectorAll('.quick-reports-input-name');
        var urlFields = document.querySelectorAll('.quick-reports-input-url');
        for (var i=0; i<nameFields.length; i++) {
            if (nameFields[i].value === '') {
                nameFields[i].className = 'quick-reports-input-name active-field';
                nameFields[i].required = true;
                return;
            }
            else if (urlFields[i].value === '') {
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
                document.querySelectorAll('.reports-select')[i].text = nameFields[i].value;
                var urlFieldId = urlFields[i].id;
                state.quickReports.inputUrls[urlFieldId] = urlFields[i].value;
                document.querySelectorAll('.reports-select')[i].value = urlFields[i].value;
                localStorage.setItem('saveState', JSON.stringify(state));
                urlFields[i].className = 'quick-reports-input-url';
                document.querySelector('#reportsSelectList').className = 'select active-select';
                document.querySelector('#quickReportsClear').className = 'clear-button show-clear';
            }
        }
    }
}
formEventListener2();
function formEventListener2 () {
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
                localStorage.setItem('saveState', JSON.stringify(state));
                urlFields[i].className = 'my-team-folders-input-url';
                document.querySelector('#foldersSelectList').className = 'select active-select';
                document.querySelector('#myTeamFoldersClear').className = 'clear-button show-clear';
            }
        }
    }
}

//  Clear forms

document.querySelector('#quickReportsClear').addEventListener('click', reportsClear);
function reportsClear (e) {
    document.querySelector('#form1').reset();
    document.querySelector('#quickReportsReport1Name').focus();
    var reportsNameFields = document.querySelectorAll('.quick-reports-input-name');
    var reportsUrlFields = document.querySelectorAll('.quick-reports-input-url');
    for (var i=0; i<reportsNameFields.length; i++) {
        reportsNameFields[i].className = 'quick-reports-input-name';
        reportsUrlFields[i].className = 'quick-reports-input-url';
    }
}
document.querySelector('#myTeamFoldersClear').addEventListener('click', foldersClear);
function foldersClear (e) {
    document.querySelector('#form2').reset();
    document.querySelector('#myTeamFoldersReport1Name').focus();
    var foldersNameFields = document.querySelectorAll('.my-team-folders-input-name');
    var foldersUrlFields = document.querySelectorAll('.my-team-folders-input-url');
    for (var i=0; i<foldersNameFields.length; i++) {
        foldersNameFields[i].className = 'my-team-folders-input-name';
        foldersUrlFields[i].className = 'my-team-folders-input-url';
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

 // search box to notifications and to iframe

document.querySelector('#searchBox').addEventListener('submit', searchLocal);
function searchLocal(e) {
    e.preventDefault();
    var reportsNameFields = document.querySelectorAll('.quick-reports-input-name');
    var reportsUrlFields = document.querySelectorAll('.quick-reports-input-url');
    for (var i = 0; i < reportsNameFields.length; i++) {
        if (document.querySelector('#searchInput').value === reportsNameFields[i].value) {
            document.querySelector('#reportsSettingsImg').className = 'no-back-color';
            document.querySelector('#quickReportsForm').className = 'quick-reports-form form-inactive';
            document.querySelector('#reportsIframe').className = 'iframe-active';
            document.querySelector('#reportsIframe').src = reportsUrlFields[i].value;
            document.querySelector('#notifications').className = 'show-notifications';
            document.querySelector('#notifications').textContent = 'Searched phrase found - link shown below';
            break;
        }
        else {
            document.querySelector('#notifications').textContent = 'Searched phrase not found';
        }
    }
    var foldersNameFields = document.querySelectorAll('.my-team-folders-input-name');
    var foldersUrlFields = document.querySelectorAll('.my-team-folders-input-url');
    for (var i = 0; i < foldersNameFields.length; i++) {
        if (document.querySelector('#searchInput').value === foldersNameFields[i].value) {
            document.querySelector('#foldersSettingsImg').className = 'no-back-color';
            document.querySelector('#myTeamFoldersForm').className = 'my-team-folders-form form-inactive';
            document.querySelector('#foldersIframe').className = 'iframe-active';
            document.querySelector('#foldersIframe').src = foldersUrlFields[i].value;
            document.querySelector('#notifications').className = 'show-notifications';
            document.querySelector('#notifications').textContent = 'Searched phrase found - link shown below';
            break;
        }
        else {
            document.querySelector('#notifications').textContent = 'Searched phrase not found';
        }
    }
}


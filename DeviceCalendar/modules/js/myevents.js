/*****************************************************************
*	Name    : CalendarAddEvent
*	Author  : Kony
*	Purpose : To add the calendar event to the device using 'kony.phone.addCalendarEvent' API
******************************************************************/

function CalendarAddEvent(eventObj)
{
	try 
	{
		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; 		
		var yyyy = today.getFullYear();		
		var h=today.getHours();
		var m=today.getMinutes();
		var s=today.getSeconds();
		if(dd<10)
			{dd='0'+dd}
		if(mm<10)
			{mm='0'+(mm)} 		 
		var date = dd+'/'+mm+'/'+yyyy;
		var stime  = h+":"+(parseInt(m)+2).toString()+":"+s;
		startTime  =date+" "+stime;
		var ftime = (parseInt(h)+1).toString()+":"+m+":"+s;
		finishTime =date+" "+ftime;
		if (eventObj["text"] == "Add a calendar event (Public)")
		{
			var evtobj={summary:"Event started", start:startTime, finish:finishTime,alarm:40, access:"public"};
			kony.phone.addCalendarEvent(evtobj);
			frmFeatures.lblCalendarEvents.text = "A calendar event is added (with Public Access) with start time = \""+startTime+"\""
		}
		
		else 
		{			
			var evtobj={summary:"Event started", start:startTime, finish:finishTime,alarm:40, access:"confidential"};
			kony.phone.addCalendarEvent(evtobj);
			frmFeatures.lblCalendarEvents.text = "A calendar event is added (With Confidential Access) with start time: \""+startTime+"\""
		}
	}
	catch(PhoneError)
	{
		alert("error in addCalendarEvent:: "+PhoneError);
	}
}


/*****************************************************************
*	Name    : CalendarRemoveEvent
*	Author  : Kony
*	Purpose : To remove the calendar event from the device using 'kony.phone.removeCalendarEvent' API
******************************************************************/

function CalendarRemoveEvent()
{
		var finishTime = "31/12/2020 12:00:00"
		var evtobj={type:"starting",start:"01/01/2013 12:00:00", finish:finishTime};
		var events = kony.phone.findCalendarEvents(evtobj);
		if(Object.keys(events).length){
			kony.phone.removeCalendarEvent(events[0]["event"]);
			frmFeatures.lblCalendarEvents.text = "An Event is removed successfully."
			alert("Event with start time: \""+events[0]["start"]+"\" and finish time: \""+events[0]["finish"]+"\" is successfully removed from calendar.")
		}
		else{
			frmFeatures.lblCalendarEvents.text = ""
			alert("No Event to remove from Calendar.");
		}
}


/*****************************************************************
*	Name    : findCalenderEvent
*	Author  : Kony
*	Purpose : To find the calendar event from the device using 'kony.phone.findCalendarEvent' API
******************************************************************/

function findCalendarEvent()
{
	try 
	{
		var finishTime = "31/12/2020 12:00:00"
		var evtobj={type:"occurring",start:"01/01/2013 12:00:00", 
		finish:finishTime};
		var events = kony.phone.findCalendarEvents(evtobj);
		var count=0;
		for(x in events)
		{
			count++;			  
		}
		if(count)
			frmFeatures.lblCalendarEvents.text = "Total "+count+" calendar events found.";
		else{
			frmFeatures.lblCalendarEvents.text = ""
			alert("No Event Found in Calendar.");
		}
			
	}
	catch(err)
	{
		alert("error in removeCalendarEvent:: "+err);
	}
	
}


/*****************************************************************
*	Name    : PreShow_frmCalendar
*	Author  : Kony
*	Purpose : To feed data in segMenu and set btnDone button visible
******************************************************************/

function PreShow_frmCalendar(){
	var labelMenu = ([{"lblMenu" : "Add a Calendar Event"},
					  {"lblMenu" : "Find the number of Event"},
					  {"lblMenu" : "Remove Event"}]);
	  frmCalendar.segMenu.setData(labelMenu);
	  frmCalendar.segMenu.selectedIndex = [0,0];
	  frmCalendar.hbxAddEvent.setVisibility(true);
	  frmCalendar.hbxSearchEvent.setVisibility(false);
	  frmCalendar.btnDone.setVisibility(true);
}


/*****************************************************************
*	Name    : onRowSelect_segMenu
*	Author  : Kony
*	Purpose : on row click of segmenu, to set visible different hboxes
******************************************************************/

function onRowSelect_segMenu(eventobject){	
	if(frmCalendar.segMenu.selectedIndex[1] == 0)
	{	
		frmCalendar.hbxAddEvent.setVisibility(true);
		frmCalendar.hbxSearchEvent.setVisibility(false);
		frmCalendar.btnDone.setVisibility(true);
	}
	else if(frmCalendar.segMenu.selectedIndex[1] == 1)
	{	
		frmCalendar.hbxAddEvent.setVisibility(false);
		frmCalendar.hbxSearchEvent.setVisibility(true);
		frmCalendar.btnDone.setVisibility(false);
		frmCalendar.segSearch.setVisibility(true);
		frmCalendar.segRemove.setVisibility(false);
	}
	else if(frmCalendar.segMenu.selectedIndex[1] == 2)
	{	
		frmCalendar.hbxAddEvent.setVisibility(false);
		frmCalendar.hbxSearchEvent.setVisibility(true);
		frmCalendar.btnDone.setVisibility(false);
		frmCalendar.segSearch.setVisibility(false);
		frmCalendar.segRemove.setVisibility(true);
	}	
}


/*****************************************************************
*	Name    : onDateSelectStart
*	Author  : Kony
*	Purpose : to set lblStartDate and lblStartTime with selected date and time on calendar
******************************************************************/

function onDateSelectStart(){
	frmCalendar.lblStartDate.text = frmCalendar.calWheelOnScrnStart.day + "/" + frmCalendar.calWheelOnScrnStart.month+ "/" + frmCalendar.calWheelOnScrnStart.year;
	frmCalendar.lblStartTime.text = frmCalendar.calWheelOnScrnStart.hour + ":" + frmCalendar.calWheelOnScrnStart.minutes + ":" + frmCalendar.calWheelOnScrnStart.seconds;
	frmCalendar.calWheelOnScrnStart.setVisibility(false);
}


/*****************************************************************
*	Name    : onClickStartTime
*	Author  : Kony
*	Purpose : to set calWheelOnScrnStart visible and calWheelOnScrnFinish invisible
******************************************************************/

function onClickStartTime(){
	frmCalendar.calWheelOnScrnStart.setVisibility(true);
	frmCalendar.calWheelOnScrnFinish.setVisibility(false);
}


/*****************************************************************
*	Name    : onClickFinishTime
*	Author  : Kony
*	Purpose : to set calWheelOnScrnStart invisible and calWheelOnScrnFinish visible
******************************************************************/

function onClickFinishTime(){
		frmCalendar.calWheelOnScrnStart.setVisibility(false);
		frmCalendar.calWheelOnScrnFinish.setVisibility(true);
}


/*****************************************************************
*	Name    : onDateSelectFinish
*	Author  : Kony
*	Purpose : to set lblFinishDate and lblFinishTime with  calWheelOnScrnFinish date and time
******************************************************************/

function onDateSelectFinish(){
	frmCalendar.lblFinishDate.text = frmCalendar.calWheelOnScrnFinish.day + "/" + frmCalendar.calWheelOnScrnFinish.month+ "/" + frmCalendar.calWheelOnScrnFinish.year;
	frmCalendar.lblFinishTime.text = frmCalendar.calWheelOnScrnFinish.hour + ":" + frmCalendar.calWheelOnScrnFinish.minutes + ":" + frmCalendar.calWheelOnScrnFinish.seconds;
	frmCalendar.calWheelOnScrnFinish.setVisibility(false);
}


/*****************************************************************
*	Name    : preShowPopAlarm
*	Author  : Kony
*	Purpose : to set data to segList of popAlarm
******************************************************************/

function preShowPopAlarm(){
	var alarmList = [{"lblAlarm" : "None"},{"lblAlarm" : "At time on event"},
	{"lblAlarm" : "5 minutes before"},{"lblAlarm" : "15 minutes before"},
	{"lblAlarm" : "30 minutes before"},{"lblAlarm" : "1 hour before"},
	{"lblAlarm" : "2 hour before"},{"lblAlarm" : "1 day before"}];
	popAlarm.segList.setData(alarmList);
}



/*****************************************************************
*	Name    : onRowClickPopUp
*	Author  : Kony
*	Purpose : to set lblAlarmValue according to slected item on segList of PopAlarm
******************************************************************/

function onRowClickPopUp(){
	if(popAlarm.segList.selectedIndex[1] == 0)
	frmCalendar.lblAlarmValue.text = "None";
	else if(popAlarm.segList.selectedIndex[1] == 1)
	frmCalendar.lblAlarmValue.text = "At time on event";
	else if(popAlarm.segList.selectedIndex[1] == 2)
	frmCalendar.lblAlarmValue.text = "5 minutes before";
	else if(popAlarm.segList.selectedIndex[1] == 3)
	frmCalendar.lblAlarmValue.text = "15 minutes before";
	else if(popAlarm.segList.selectedIndex[1] == 4)
	frmCalendar.lblAlarmValue.text = "30 minutes before";
	else if(popAlarm.segList.selectedIndex[1] == 5)
	frmCalendar.lblAlarmValue.text = "1 hour before";
	else if(popAlarm.segList.selectedIndex[1] == 6)
	frmCalendar.lblAlarmValue.text = "2 hours before";
	else if(popAlarm.segList.selectedIndex[1] == 7)
	frmCalendar.lblAlarmValue.text = "1 day before";
}



/*****************************************************************
*	Name    : onClickCancelPopUp
*	Author  : Kony
*	Purpose : to reset lblAlarmValue and dismiss popAlarm
******************************************************************/

function onClickCancelPopUp(){
	frmCalendar.lblAlarmValue.text = "";
	popAlarm.dismiss();
}


/*****************************************************************
*	Name    : onClickDonePopUp
*	Author  : Kony
*	Purpose : to dismiss popAlarm
******************************************************************/

function onClickDonePopUp(){
	popAlarm.dismiss();
}


/*****************************************************************
*	Name    : onClickAlarm
*	Author  : Kony
*	Purpose : to set context to popAlarm and show on click alarm label
******************************************************************/

function onClickAlarm(){
	var context= {"widget":frmCalendar.lblAlarmKey,"anchor":"right","sizetoanchorwidth":false}
    popAlarm.setContext(context);
    popAlarm.show();
}


/*****************************************************************
*	Name    : preShowPopUpAccess
*	Author  : Kony
*	Purpose : to set data to segAccess of popAccess 
******************************************************************/

function preShowPopUpAccess(){
	var accessList = [{"lblAccess" : "Public"},{"lblAccess" : "Private"},{"lblAccess" : "Confidential"}];
	popAccess.segAccess.setData(accessList);
}


/*****************************************************************
*	Name    : onRowClickPopAccess
*	Author  : Kony
*	Purpose : to set lblAccesValue with row selected on segAccess 
******************************************************************/

function onRowClickPopAccess(){
	if(popAccess.segAccess.selectedIndex[1] == 0)
	frmCalendar.lblAccessValue.text = "Public";
	else  if(popAccess.segAccess.selectedIndex[1] == 1)
	frmCalendar.lblAccessValue.text = "Private";
	else if(popAccess.segAccess.selectedIndex[1] == 2)
	frmCalendar.lblAccessValue.text = "Confidential";
}


/*****************************************************************
*	Name    : onClickAccess
*	Author  : Kony
*	Purpose : to set context of popAccess and invoke it onclick of hbxAccess
******************************************************************/

function onClickAccess(){
	var context= {"widget":frmCalendar.lblAccessKey,"anchor":"right","sizetoanchorwidth":false}
    popAccess.setContext(context);
    popAccess.show();
}


/*****************************************************************
*	Name    : onDone
*	Author  : Kony
*	Purpose : to get data from user and add new calendar event on click of done button using kony.phone.addCalendarEvent API
******************************************************************/

function onDone(){
	
	var s_time = frmCalendar.lblStartDate.text + " " + frmCalendar.lblStartTime.text;
	var f_time = frmCalendar.lblFinishDate.text + " " + frmCalendar.lblFinishTime.text;
	
	var alarm_time = 0;
	
	if(frmCalendar.lblAlarmValue.text ==  "None")
	alarm_time = null;
	else if(frmCalendar.lblAlarmValue.text ==  "At time on event")
	alarm_time = 0;
	if(frmCalendar.lblAlarmValue.text ==  "5 minutes before")
	alarm_time = 300;
	if(frmCalendar.lblAlarmValue.text ==  "15 minutes before")
	alarm_time = 900;
	if(frmCalendar.lblAlarmValue.text ==  "30 minutes before")
	alarm_time = 1800;
	if(frmCalendar.lblAlarmValue.text ==  "1 hour before")
	alarm_time = 3600;
	if(frmCalendar.lblAlarmValue.text ==  "2 hours before")
	alarm_time = 7200;
	if(frmCalendar.lblAlarmValue.text ==  "1 day before")
	alarm_time = 86400;
	
	try {
		var evtobj={summary : frmCalendar.txtSummary.text , start : s_time, finish : f_time,alarm:alarm_time, access : frmCalendar.lblAccessValue.text};
		kony.phone.addCalendarEvent(evtobj);
		alert("Event successfuly added to your calendar");
		frmCalendar.txtSummary.text = "";
		frmCalendar.lblAccessValue.text = "";
		frmCalendar.lblAlarmValue.text = "";
		frmCalendar.lblFinishDate.text = "";
		frmCalendar.lblFinishTime.text = "";
		frmCalendar.lblStartDate.text = "";
		frmCalendar.lblStartTime.text = "";
	}
	catch (e) {
	// todo: handle exception
	alert("Not able to add new calendar event" + e);
	}
}


/*****************************************************************
*	Name    : onClickSearch
*	Author  : Kony
*	Purpose : to get data from user search for calendar events starting between given start and fininsh point using kony.phone.findCalendarEvents API,
			  and set these data to segSearch or segRemove segments
*******************************************************************/

function onClickSearch(){
	var start_time = frmCalendar.calStartTime.day + "/" + frmCalendar.calStartTime.month + "/" +
					 frmCalendar.calStartTime.year+ " " + frmCalendar.calStartTime.hour + ":" +
					 frmCalendar.calStartTime.minutes + ":" + frmCalendar.calStartTime.seconds ;
					 
	var finish_time = frmCalendar.calFinishTime.day + "/" + frmCalendar.calFinishTime.month + "/" +
					 frmCalendar.calFinishTime.year+ " " + frmCalendar.calFinishTime.hour + ":" +
					 frmCalendar.calFinishTime.minutes + ":" + frmCalendar.calFinishTime.seconds ;
					
	var evtobj={type:"starting",start : start_time, 
		finish : finish_time};
	var events = [];
	try{	
		 events = kony.phone.findCalendarEvents(evtobj);
		kony.print(events);
	}
	catch (e) {
	alert(e);
	// todo: handle exception
	}				 
	var dataArray = [];
	if(frmCalendar.segMenu.selectedIndex[1] == 1){
		frmCalendar.segRemove.setVisibility(false);
		frmCalendar.segSearch.setVisibility(true);
		for(var i=0; i < events.length ;i++){
			dataArray.push({"lblSearch" : events[i]["summary"]});
		}
		frmCalendar.segSearch.setData(dataArray);
	}
	else if(frmCalendar.segMenu.selectedIndex[1] == 2){
		frmCalendar.segSearch.setVisibility(false);
		frmCalendar.segRemove.setVisibility(true);
		dataArray = [];
		for(var i=0 ; i< events.length ; i++)
			 	dataArray.push({"lblRemove" : events[i]["summary"],
			 					"lblHiddenStart" : events[i]["start"],
			 					"lblHiddenFinish" : events[i]["finish"],
			 					"imgRemove" : "remove_ipad.png" } );
			 frmCalendar.segRemove.setData(dataArray);					
	}
	
}

function onClickSearch_Mobile(){
	var start_time = frmSearch.calStartTime.day + "/" + frmSearch.calStartTime.month + "/" +
					 frmSearch.calStartTime.year+ " " + frmSearch.calStartTime.hour + ":" +
					 frmSearch.calStartTime.minutes + ":" + frmSearch.calStartTime.seconds ;
					 
	var finish_time = frmSearch.calFinishTime.day + "/" + frmSearch.calFinishTime.month + "/" +
					 frmSearch.calFinishTime.year+ " " + frmSearch.calFinishTime.hour + ":" +
					 frmSearch.calFinishTime.minutes + ":" + frmSearch.calFinishTime.seconds ;
					
	var evtobj={type:"starting",start : start_time, 
		finish : finish_time};
	var events = [];
	try{	
		 events = kony.phone.findCalendarEvents(evtobj);
		kony.print(events);
	}
	catch (e) {
	alert(e);
	// todo: handle exception
	}				 
	var dataArray = [];
		for(var i=0; i < events.length ;i++){
			dataArray.push({"lblSearch" : events[i]["summary"]});
		}
		frmSearch.segSearch.setData(dataArray);
	
	//else if(frmCalendar.segMenu.selectedIndex[1] == 2){
//		frmCalendar.segSearch.setVisibility(false);
//		frmCalendar.segRemove.setVisibility(true);
//		dataArray = [];
//		for(var i=0 ; i< events.length ; i++)
//			 	dataArray.push({"lblRemove" : events[i]["summary"],
//			 					"lblHiddenStart" : events[i]["start"],
//			 					"lblHiddenFinish" : events[i]["finish"],
//			 					"imgRemove" : "remove.png" } );
//			 frmCalendar.segRemove.setData(dataArray);					
//	}
	
}

function onClickSearch_Remove_Mobile(){
	var start_time = frmRemove.calStartTime.day + "/" + frmRemove.calStartTime.month + "/" +
					 frmRemove.calStartTime.year+ " " + frmRemove.calStartTime.hour + ":" +
					 frmRemove.calStartTime.minutes + ":" + frmRemove.calStartTime.seconds ;
					 
	var finish_time = frmRemove.calFinishTime.day + "/" + frmRemove.calFinishTime.month + "/" +
					 frmRemove.calFinishTime.year+ " " + frmRemove.calFinishTime.hour + ":" +
					 frmRemove.calFinishTime.minutes + ":" + frmRemove.calFinishTime.seconds ;
					
	var evtobj={type:"starting",start : start_time, 
		finish : finish_time};
	var events = [];
	try{	
		 events = kony.phone.findCalendarEvents(evtobj);
		kony.print(events);
	}
	catch (e) {
	alert(e);
	// todo: handle exception
	}				 
	var dataArray = [];
		for(var i=0 ; i< events.length ; i++)
			 	dataArray.push({"lblRemove" : events[i]["summary"],
			 					"lblHiddenStart" : events[i]["start"],
			 					"lblHiddenFinish" : events[i]["finish"],
			 					"imgRemove" : "remove_iphone.png" } );
			 frmRemove.segRemove.setData(dataArray);				
	
}

/*****************************************************************
*	Name    : onClickSegRemove
*	Author  : Kony
*	Purpose : on click of segRemove  remove calendar events from device calendar using kony.phone.removeCalendarEvent
******************************************************************/

function onClickSegRemove(eventobject){
	//alert(JSON.stringify(eventobject["selectedItems"]));
	kony.print(JSON.stringify(eventobject));
	var start_time = eventobject["selectedItems"][0]["lblHiddenStart"];
					 
	var finish_time = eventobject["selectedItems"][0]["lblHiddenFinish"];
					
	var evtobj={type:"starting",start : start_time, finish : finish_time};
	var events = [];
	events = kony.phone.findCalendarEvents(evtobj);
	try{
		kony.phone.removeCalendarEvent(events[0]["event"]);
		alert("Event with \nstart time : \"" +eventobject["selectedItems"][0]["lblHiddenStart"] +
		"\" \nEnd time : \"" + eventobject["selectedItems"][0]["lblHiddenFinish"] + "\"\nis successfully removed from calendar.");
	}
	catch (e) {
	// todo: handle exception
		alert(e);
	}
	onClickSearch();	
}

function onClickSegRemove_Mobile(eventobject){
	
	//alert(JSON.stringify(eventobject));
	kony.print(JSON.stringify(eventobject));
	var start_time = eventobject["selectedItems"][0]["lblHiddenStart"];
					 
	var finish_time = eventobject["selectedItems"][0]["lblHiddenFinish"];
					
	var evtobj={type:"starting",start : start_time, finish : finish_time};
	var events = [];
	events = kony.phone.findCalendarEvents(evtobj);
	try{
		kony.phone.removeCalendarEvent(events[0]["event"]);
		alert("Event with \nstart time : \"" +eventobject["selectedItems"][0]["lblHiddenStart"] +
		"\" \nEnd time : \"" + eventobject["selectedItems"][0]["lblHiddenFinish"] + "\"\nis successfully removed from calendar.");
	}
	catch (e) {
	// todo: handle exception
		alert(e);
	}
	onClickSearch_Remove_Mobile();	
}


/*****************************************************************
*	Name    : onClickPopAccessCancel
*	Author  : Kony
*	Purpose : to reset lblAccessValue label and dismiss popAccess
******************************************************************/

function onClickPopAccessCancel(){
	frmCalendar.lblAccesValue.text = "";
	popAccess.dismiss();
}


/*****************************************************************
*	Name    : onClickPopAccessDone
*	Author  : Kony
*	Purpose : to dismiss popAccess
******************************************************************/

function onClickPopAccessDone(){
	popAccess.dismiss();
}

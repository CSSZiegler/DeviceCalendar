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
		//alert("Finding the calendar events");
		var finishTime = "31/12/2020 12:00:00"
		var evtobj={type:"starting",start:"01/01/2013 12:00:00", 
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
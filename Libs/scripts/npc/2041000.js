/* Author: Xterminator
	NPC Name: 		Tian
	Map(s): 		Ludibrium: Station<Orbis> (220000110)
	Description: 		Ludibrium Ticketing Usher
*/
var status = 0;

function start() {
    status = -1;
    train = cm.getEventManager("Trains");
    action(1, 0, 0);
}

function action(mode, type, selection) {
    status++;
    if(mode == 0) {
	cm.sendNext("You must have some business to take care of here, right?");
	cm.dispose();
	return;
    }
    if (status == 0) {
	if(train == null) {
	    cm.sendNext("Event error, please restart your server for solution");
	    cm.dispose();
	} else if(train.getProperty("entry").equals("true")) {
	    cm.sendYesNo("It looks like there's plenty of room for this ride. Please have your ticket ready so I can let you in, The ride will be long, but you'll get to your destination just fine. What do you think? Do you want to get on this ride?");
	} else if(train.getProperty("entry").equals("false") && train.getProperty("docked").equals("true")) {
	    cm.sendNext("The train is getting ready for takeoff. I'm sorry, but you'll have to get on the next ride. The ride schedule is available through the usher at the ticketing booth.");
	    cm.dispose();
	} else {
	    cm.sendNext("We will begin boarding 1 minutes before the takeoff. Please be patient and wait for a few minutes. Be aware that the subway will take off on time, and we stop receiving tickets 1 minute before that, so please make sure to be here on time.");
	    cm.dispose();
	}
    } else if(status == 1) {
	if(!cm.haveItem(4031045)) {
	    cm.sendNext("Oh no ... I don't think you have the ticket with you. I can't let you in without it. Please buy the ticket at the ticketing booth.");
	} else {
	    cm.gainItem(4031045, -1);
	    cm.warp(220000111, 0);
	}
	cm.dispose();
    }
}
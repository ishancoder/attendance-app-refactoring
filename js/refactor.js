$(document).ready(function(){
//Model
var model = {
	totalDays: 12,
	init: function(){
		if(!localStorage.attendance){
			var data = [
				{
					name:"Slappy the Frog",
					attended:[]
				},
				{
					name:"Lizzy the Lizard",
					attended:[]
				},
				{
					name:"Paulrus the Walrus",
					attended:[]
				},
				{
					name:"Georgy the Goat",
					attended:[]
				},
				{
					name:"Adam the Anaconda",
					attended:[]
				}
			]

			for (var i = 0 ; i < data.length ; i++) {
				for (var j = 0 ; j < this.totalDays ; j++) {
					data[i].attended.push(
						Math.random() >= 0.5
					);
				}//end of sub for loop
			}//end of main for loop

			localStorage.attendance = JSON.stringify(data);
		}
	},//end of init
	getData: function(){
		return JSON.parse(localStorage.attendance);
	}//end of getData
}//end of model

//Octopus
var octopus={
	init: function(){
		model.init();
		calView.init();
	}, //end of init
	getAttendace: function(student_name){
		var data = model.getData();
		for(var i=0 ; i < data.length ; i++) {
			if(data[i].name == student_name) {
				return data[i].attended;
			}
		}
		return "No student found of name " + student_name;
	}, //end of getAttendance
	updateAttendance: function(student_name,newAttendance){
		var data = model.getData();
		for(var i = 0 ; i < data.length ; i++) {
			if(data[i].name == student_name) {
				data[i].attended = newAttendance;
				localStorage.attendance = JSON.stringify(data);
				break;
			}
		}//end of forloop
		return data;
	},//end of updateAttendance
	getData: function(){
		return model.getData();
	},
	getTotalDays: function(){
		return model.totalDays;
	}
}//end of octopus

//View
var calView={
	init: function(){
		this.tableRows = $("#cal-view");
		this.render();
	},

	render: function(){
		htmlRows = '';
		var data = octopus.getData();
		var totalDays = octopus.getTotalDays();
		for(var i = 0 ; i < data.length ; i++) {
			htmlRows += '<tr class="student">'+
               '<td class="name-col">'+data[i].name+'</td>';
                for(var j = 0 ; j < totalDays ; j++) {
                	var checked = (data[i].attended[j]) ? "checked" : "";
                   	htmlRows += '<td class="attend-col"><input type="checkbox"'+checked+'></td>';
                }
            htmlRows += '<td class="missed-col">'+data[i].attended.filter(function(each){
            	return each == false;
            }).length+'</td></tr>';
		}
		
		this.tableRows.html(htmlRows);

		this.checkboxes = $("#cal-view input");
		this.checkboxes.on('change',function(){
			var name = $(this).parents().children(".name-col").text();
			var allCheckbox = $(this).parent().parent().children(".attend-col").children();
			var newAttendance = [];
			for(var i=0 ; i < allCheckbox.length ; i++) {
				newAttendance.push(allCheckbox[i].checked);
			}
			octopus.updateAttendance(name, newAttendance);
			calView.render();
		});
	}
}

octopus.init();
});//end of document.ready
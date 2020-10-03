const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://ChaseYin:yinxiaofeng0206@sit314.jxii8.mongodb.net/SIT314DB?retryWrites=true&w=majority",{useNewUrlParser: true})
//mongoose.connect("mongodb://localhost:27017/SIT314DB",{useNewUrlParser: true})


// mongodb://localhost:27017/SIT314DB



var i = 1;
var increase;
var decrease;
var decreaseTime = 1
var improveTime = 1;
const albumSchema = new mongoose.Schema(
	{
		id:Number,
		switch:String,
		userClick:false,
		nearLight:Number,
		time: Date,
		brightness:Number,
		clickTime:Number,
		type:String,
		colorTemperature:Number,
		color:String
	}
)

const Album = new mongoose.model("Album",albumSchema)
const Bulb = new mongoose.model("Album",albumSchema)

var interval = setInterval(insertAlbum,2000);

function insertAlbum()
{
	const album1 = new Album(
	{
		id:i,
		switch:'off',
		userClick:false,
		nearLight:0,
		time: Date.now(),
		brightness:0,
		clickTime:0,
		type:'Room',
		colorTemperature:1300,
		color:'0'
	});
	album1.save().then(doc => {
        console.log(doc);
		console.log("set up successfully");
		i = i+1
	})
	if(i==10)
	{
		console.log('灯泡初始化完毕')
		clearInterval(interval);
		setTimeout(function(){ improveLight() }, 20000);
	}
	
}

function improveLight(){
	Album.updateMany({
		'id': { $in: [
			8,9,10
		]}
	}, {$set:{type:'Corridor'}},function(err, res){
	  if(err){
		console.log('Update failed'+err)
	  }
	  else
	  {
		console.log('Successfully update'+res)
	  }
	}).then(function(){
		increase = setInterval(increaseLight, 40000)//time interval to increase environmental brightness
	});

	
}
function increaseLight()
{
	if(improveTime!=11){
	console.log('Start improving environmental brightness')
	console.log('The improve time is :'+improveTime)
	var i = 1;
	var interval = setInterval(autoLight,2000);
	function autoLight()
	{
		Album.findOne({
		id:i
	}).then(albumInfo => {
		if(albumInfo)
		{
			albumInfo.nearLight = improveTime * 10	//update environmental brightness
			console.log('Find bulb:'+albumInfo)
			i = i+1
			albumInfo.save()
		}
		else{
			console.log('All bulbs have been updated!')
			improveTime = improveTime + 1
			i = 1;
			clearInterval(interval);
			}
		})
	}
	}
	else{
	console.log('Start decreasing brightness...')
	clearInterval(increase);
	improveTime = 1;
	decrease = setInterval(decreaseLight, 40000)
	}
}

function decreaseLight(){
	var num = 1;
	if(decreaseTime!=11)
	{
		var decreaseInterval = setInterval(autoDecrease,2000);
		function autoDecrease(){
			Album.findOne({
				id:num
			}).then(albumInfo => {
				if(albumInfo)
				{
					albumInfo.nearLight = 100 - decreaseTime * 10	
					console.log('Find bulbs：'+albumInfo)
					num = num+1
					albumInfo.save()
				}
				else{
					console.log('All bulbs have been updated!')
					decreaseTime = decreaseTime + 1
					num = 1;
					clearInterval(decreaseInterval);
				}
				
			})
		}
	}
	else
	{
		console.log('Strat increasing brightness')
		clearInterval(decrease);
		decreaseTime = 1;
		increase = setInterval(increaseLight, 40000)
	}
}


setInterval(autoSwitchLighter, 15000)//Auto control bulbs in corridor
function autoSwitchLighter(){
	var num = 8;
	var switchLighter = setInterval(autoSwitch, 2000)
	function autoSwitch(){
		Album.findOne({
			id:num,
			type:'Corridor'
		}).then(albumInfo => {
			if(albumInfo)
			{
				if(albumInfo.clickTime%2==1)
				{
					console.log('Bulb：'+num+'is not in auto controling')
					num = num + 1
				}
				else
				{
					if(albumInfo.nearLight>50)
					{
						albumInfo.switch = 'off'
						albumInfo.brightness = 0
						albumInfo.color = '0'
						console.log('==========Auto================Turn off corridor bulb：'+albumInfo.id+'===================')
						num = num+1
						albumInfo.save()
					}
					else
					{
						if(albumInfo.voice>50)
						{
							albumInfo.switch = 'on'
							albumInfo.brightness = 75
							albumInfo.color = 'Yellow'
							albumInfo.save()
							num = num + 1
						}
						else
						{
							albumInfo.switch = 'on'
							albumInfo.brightness = 50
							albumInfo.color = 'Yellow'
							albumInfo.save()
							num = num + 1
						}
						
						
					}
				}
				
			}
			else{
				console.log('Auto control finished!')
				num = 1;
				clearInterval(switchLighter);
			}
			
		})
	}
}






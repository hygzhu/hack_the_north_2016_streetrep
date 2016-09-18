
$(document).ready(function() {
			$("#loginbutton").on("touchend click",function(){
				var _this = $(this)
				var first = _this.parents().find("input[name=first]").val();
				var last = _this.parents().find("input[name=last]").val();
				var username = _this.parents().find("input[name=user]").val();
				var user = {
					"username": username,
					"firstName": first,
					"lastName": last
				}
				localStorage.setItem("username", username);

				var data =user;
				$.ajax({
					data: data,
					crossDomain: true,
					method: 'POST',
					url: 'http://localhost:3000/users/create',
					success: function(res){
						// change to google maps page
						console.log(res + " success");
						window.location.assign("map.html");
			
					},
					error: function(res){
						console.log(res + " fail");
			
					}
				});
				
			})
		}
		)
		
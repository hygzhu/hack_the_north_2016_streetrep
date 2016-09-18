
$(document).ready(function() {
			$("#loginbutton").on("touchend click",function(){
				var _this = $(this)
				var first = _this.parents().find("input[name=first]").val();
				var last = _this.parents().find("input[name=last]").val();
				var username = _this.parents().find("input[name=user]").val();
				var user -{
					"firstName": first,
					"lastName": last,
					"username": username
				}
				var data =user;
				$.ajax({
					data: data
					method: 'POST'
					success: function(res){
						// change to google maps page
					}

				})
				
			})
		}
		)
		
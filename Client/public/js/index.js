// const { userInfo } = require("os");


$(function(){
var countryList = [
    'Select your country:','Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei',
    'Bulgaria', 'Burkina Faso', 'Burundi', 'Côte d\' Ivoire', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo(Congo-Brazzaville)', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czechia (Czech Republic)', 'Democratic Republic of the Congo', 'Denmark',
    'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini("Swaziland")', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany',
    'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica',
    'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia',
    'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (formerly Burma)', 'Namibia', 'Nauru', 'Nepal',
    'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine State', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
    'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia',
    'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Tajikistan',
    'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela',
    'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe']//set countryList manually

    function initSelect() {

        //登录以后页面没有这个元素 所以要判断一下
        var a_list = document.getElementsByName('country');
        var a = a_list.length>0?a_list[0]:null;
        if(a == null){
            return;
        }
        var html = '';
        for (var i = 0; i < countryList.length; i += 1) {
          var name = countryList[i];
          html += `
          <option value="${name}">${name}</option>
          `;
        }
        a.innerHTML = html;
        window.fieldMap = {
            country: document.getElementsByName('country')[0].value,
        };
      }
      
      initSelect();


    var $loginBox = $("#loginBox");
    var $loginButton = $("loginButton");
    var $reginBox = $("#registerBox");
    var $userInfo = $("#userInfo");
    // var $exitBox = $("#exitBox");
  
    $loginBox.find('a.colMint').on('click',function(){
        $loginBox.hide();
        $reginBox.show();
    });
    $reginBox.find('a.colMint').on('click',function(){
        $reginBox.hide();
        $loginBox.show();
    });
   
    $reginBox.find('button').on('click',function(){
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                country: $reginBox.find('[name="country"]').val(),
                first_name:$reginBox.find('[name=first_name]').val(),
                last_name:$reginBox.find('[name=last_name]').val(),
                username: $reginBox.find('[name="username"]').val(),
                email:$reginBox.find('[name="email"]').val(),
                password:$reginBox.find('[name="password"]').val(),
                repassword:$reginBox.find('[name=repassword]').val(),
                city:$reginBox.find('[name=city]').val(),
                region:$reginBox.find('[name=region]').val(),
                address:$reginBox.find('[name=address]').val(),
                zip_postal_code:$reginBox.find('[name=zip_postal_code]').val(),
                tel:$reginBox.find('[name=tel]').val()
            },
            dataType:'json',
            success:function(result){
                console.log(result);
                $reginBox.find(".colWarning ").html(result.message);
                if(!result.code){
                    $reginBox.hide();
                    $loginBox.show();
                }
            },
            error: function(result){

            }
        })
    });
    $loginBox.find('button').on('click',function(){
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username: $loginBox.find('[name="username"]').val(),
                password:$loginBox.find('[name="password"]').val(),
            },
            dataType:'json',
            success:function(result){
                $loginBox.find('.colWarning').html(result.message);
                if(!result.code){
                   window.location.reload();
                }
                if($('#remember').is(':checked')){
                    var email = $('#vEmail').val();
                    var password = $('#vPassword').val();
                    $.cookie('email',email,{expires:0.1});
                    $.cookie('password',password,{expires:0.1});
                    $.cookie('remember',true,{expires:0.1});
                    
                }
                else{
                    //reset cookies
                    $.cookie('email', null);
                    $.cookie('password', null);
                    $.cookie('remember', null);
                    //  $.cookie('userInfo', null);
                }

            }
        })
    });

    $("#logout").on('click',function(){
        $.ajax({
            url:'api/user/logout',
            type:'get',
            data:{
            },
            dataType:'json',
            success:function(result){
                if(!result.code){
                     window.location.reload();
                }
            }
            
        })
    })
})
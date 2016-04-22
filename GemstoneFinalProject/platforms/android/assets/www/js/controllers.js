
var user;
var pass;
var count = 0;
var count1= 0;
var stoneName;
var stoneType;
var stnName;
var ID;

angular.module('starter.controllers', ['ionic','ngCordova'])

    .controller('DashCtrl', function($scope,$ionicPopover,$rootScope,$http,$state,$ionicPopup,$ionicLoading) {

        $scope.changePassword=function(oldPass,newPass,confirm_pass){

            $http.get("http://gemstonelive.azurewebsites.net/api/perUserRegisters?username="+user)
                .then(function onFulfilled(resp) {
                    $scope.getnames = resp.data;
                    var getDetails = $scope.getnames;
                    var id = getDetails[0].id;
                    var checkPass = getDetails[0].passWord;
                    var pass=oldPass;
                    var firstname = getDetails[0].firstName;
                    var lastname = getDetails[0].lastName;
                    var agent_username = getDetails[0].userName;
                    var location = getDetails[0].originAgent;
                    var emailid = getDetails[0].emailId;
                    var contact = getDetails[0].contactAgent;
                    var ag_roles = getDetails[0].agentRole;
                    var addedby = getDetails[0].addedBy;
                    var new_pass = newPass;
                    var confirmpass = confirm_pass;
                    //alert(confirm_pass);
                    if (pass==checkPass){
                        if(new_pass==confirm_pass) {
                            alert("1");
                            $http.delete("http://gemstonelive.azurewebsites.net/api/perUserRegisters/"+id)
                                .success(function (res) {

                                    var request = $http({
                                        method: "post",
                                        url: "http://gemstonelive.azurewebsites.net/api/perUserRegisters",
                                        crossDomain: true,
                                        data: {
                                            firstName: firstname,
                                            lastName: lastname,
                                            userName: agent_username,
                                            agentRole: ag_roles,
                                            emailId: emailid,
                                            contactAgent: contact,
                                            addedBy: addedby,
                                            passWord: new_pass,
                                            originAgent: location
                                        },
                                        headers: {'Content-Type': 'application/json'}
                                    }).success(function (resp) {

                                        alert('Password Changed Successfully');
                                    })

                                })


                        }
                        else
                        {
                            alert("Passwords doesn't match..")
                        }
                    }
                    else
                    {
                        alert("Wrong Password!! Please Enter the Correct Old Password")
                    }

                })
        };


        $scope.insert=function(){
            $state.go('signup')
        };

        $scope.logout = function () {
            //$state.go('login');
            window.location = "index.html";
        };

        $scope.forgotPassword = function(){
            var alertPopup = $ionicPopup.alert({
                title: 'Successful!',
                template: 'New Password has been sent to your registered email ID'
            });
        }

        var template = '<ion-popover-view><ion-header-bar><h1 class="title">Settings</h1></ion-header-bar><ion-content><div class="list"><a class="item" target="_blank" ui-sref="changepassword" ng-click="hidePopover()">Change Password</a><a class="item" target="_blank" ng-click="hidePopover();logout()">Logout</a></div></ion-content></ion-popover-view>';

        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        });

        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('my-popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });

        $http.get("http://gemstonelive.azurewebsites.net/api/perItemDetails")
            .success(function(res){
                $scope.getPerItemDetails=res;
                $scope.appItems=res.length;


            });


        $scope.signup = function () {
            var firstName = this.firstName;
            var lastName = this.lastName;
            var userName2 = this.Naam;
            var city = this.city;
            var emailId = this.email_id;
            var contact = this.contact;
            var pass = 'abcd1234';
            var add_by = 'Application';

            $http.get("http://gemstonelive.azurewebsites.net/api/userRegisters?user=" + userName2)
                .then(function onFulfilled(resp) {
                    $scope.getnames = resp.data;
                    var getSignUpDetails = $scope.getnames;
                    var checkUserName = getSignUpDetails[0].userName;
                    //  alert(angular.isDefined(checkUserName));
                    //alert(JSON.stringify(checkUserName));
                    if (checkUserName == userName2) {
                        //alert("user name already exists")
                        var alertPopup = $ionicPopup.alert({
                            title: 'SignUp Failed!!',
                            template: 'Username already exists, Please try another one'
                        });
                    }
                }).catch ( function onRejected(response)
            {
                var request = $http({
                    method: "POST",
                    url: "http://gemstonelive.azurewebsites.net/api/userRegisters",
                    crossDomain: true,
                    data: {
                        firstName: firstName,
                        lastName: lastName,
                        userName: userName2,
                        origin: city,
                        emailId: emailId,
                        contact: contact,
                        passWord: pass,
                        addedBy: add_by
                    },
                    headers: {'Content-Type': 'application/json'}
                })
                    .success(function (resp) {
                        //alert("success");
                        $http.get('http://gemstonelive.azurewebsites.net/api/userRegisters')
                            .success(function (res) {
                                //alert("Registered !!!");
                                var alertPopup = $ionicPopup.alert({
                                    title: 'SignUp Successful!!',
                                    template: 'You will be able to login once admin approves your request.'
                                });
                                $state.go('login');
                            });
                    });
                /*this.firstName = "";
                 this.lastName = "";
                 this.Naam = "";
                 this.city = "";
                 this.email_id = "";
                 this.contact = "";
                 */
            })
        }


        $http.get("http://gemstonelive.azurewebsites.net/api/itemDetails?name_user="+user)
            .success(function(res){
                $scope.getItemDetails=res;
                var getItemDetails=$scope.getItemDetails;
                var len=res.length;
                $scope.len=len;

            });

        $scope.show = function() {
            $ionicLoading.show({
                template: '<p>Signing In, Please Wait..</p><ion-spinner icon="android"></ion-spinner>'
            });
        };

        $scope.hide = function(){
            $ionicLoading.hide();
        };

        $http.get("http://gemstonelive.azurewebsites.net/api/perItemDetails")
            .success(function(res){
                $scope.getItemDetails=res;
              var lengthh=res.length;
                $rootScope.totalLen=lengthh;

            })


        $scope.login = function (text1,text2) {
            user = text1;
            pass = text2;

            $scope.show($ionicLoading);

            $http.get("http://gemstonelive.azurewebsites.net/api/perUserRegisters?username="+user+"&password="+pass)
                .then(function onFulfilled(response) {

                    $scope.getResult = response.data;

                    var result = $scope.getResult;

                    var username = result[0].userName;
                    var password = result[0].passWord;

                    $rootScope.first = result[0].firstName;
                    $rootScope.location1 = result[0].originAgent;
                    $rootScope.contact = result[0].contactAgent;

                    global_id=result[0].id;
                    var agentRole=result[0].agentRole;
                    $rootScope.Role = result[0].agentRole;



                    if (username == user && password == pass && agentRole == 'Purchaser' )
                    {
                        $state.go('tab.dash');
                        $http.get("http://gemstonelive.azurewebsites.net/api/itemDetails?name_user="+user)
                            .success(function(res){
                                $scope.getItemDetails=res;
                                var getItemDetails=$scope.getItemDetails;
                                len=res.length;
                                $rootScope.lenn=len;

                            })
                    }
                    if (username == user && password == pass && agentRole == 'Salesman' )
                    {
                        $state.go('tab1.dash1');
                        $http.get("http://gemstonelive.azurewebsites.net/api/itemDetails")
                            .success(function(res){
                                $scope.getItemDetails=res;
                                var getItemDetails=$scope.getItemDetails;
                                len=res.length;
                                $rootScope.lenn=len;

                            })
                    }
                    /* else if(username == user && password == pass && agentRole=="Salesman"){
                     $state.go("SellerHome");
                     }*/

                }).catch ( function onRejected(response) {
                //alert("catch")  ;
                console.log(response.status);
                var alertPopup = $ionicPopup.alert({
                    title: 'Login Failed !',
                    template: 'Please Enter Correct Credentials'
                });
            }).finally(function($ionicLoading) {
                // On both cases hide the loading
                $scope.hide($ionicLoading);
            });
        };
    })

    .controller('ChatsCtrl', function($scope,$ionicPopover,$rootScope,$http,$cordovaCamera,$state,$ionicPopup,$window,$ionicModal) {

        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });

        $scope.stones = {
            'Precious': {
                'Ruby': ['Vivid Red', 'Piegon Red', 'Red'],
                'Sapphire': ['Royal Blue', 'Corn Flower Blue', 'Blue','Deep Blue'],
                'Emerald': ['Green', 'Deep Green', 'Light Green']
            },
            'Semi-Precious': {
                'Rubellite': ['Red', 'Pinkish Red','Orangish Red'],
                'Tanzanite': ['Purple Blue', 'Deep Blue', 'Light Blue'],
                'Green Tourmouline': ['Light Green', 'Dark Green']
            },
            'Diamonds': {
                'White': ['White','Cream White'],
                'Yellow': ['Yellow','Light Yellow']
            }
        };


        $scope.GetSelectedType = function () {
            $scope.strType = $("#type option:selected").text();
            stoneType = $scope.strType;
        };
        $scope.GetSelectedStone = function () {
            $scope.strStone = $("#stone option:selected").text();
            stoneName = $scope.strStone;
        };
        $scope.st = function(){
            if(stoneName == 'Ruby'){
                $scope.treatments = ['Heated','Non Heated','Major Treatment','Filled'];
                $scope.qualities = ['Clean','Slight Inclusion','Bubbles'];
                $scope.num = 'RB' + (Math.ceil(Math.random() * 10000));

            }
            if(stoneName == 'Sapphire'){
                $scope.treatments = ['Heated','Non Heated','Major Treatment','Filled'];
                $scope.qualities = ['Clean','Slight Inclusion','Major Inclusion'];
                $scope.num = 'SP' + (Math.ceil(Math.random() * 10000));

            }
            if(stoneName == 'Emerald'){
                $scope.treatments = ['No Oil','Insignificant Oil','Minor Oil','Minor to Moderate Oil','Moderate Oil'];
                $scope.qualities = ['Clean','Slight Inclusion','Major Inclusion'];
                $scope.num = 'EM' + (Math.ceil(Math.random() * 10000));

            }
            if(stoneName == 'Rubellite'){
                $scope.treatments = ['Heated','Non Heated','Major Treatment','Filled'];
                $scope.qualities = ['Clean','Slight Inclusion','Major Inclusion'];
                $scope.num = 'RT' + (Math.ceil(Math.random() * 10000));

            }
            if(stoneName == 'Tanzanite'){
                $scope.treatments = ['Heated','Non Heated','Major Treatment','Filled'];
                $scope.qualities = ['Clean','Slight Inclusion','Major Inclusion'];
                $scope.num = 'TZ' + (Math.ceil(Math.random() * 10000));

            }
            if(stoneType == 'Diamonds'){
                $scope.treatments = ['Heated','Non Heated','Major Treatment','Filled'];
                $scope.qualities = ['IF','VVS1','VVS2','VS1','VS2','SI1','SI2','SI3','I1','I2'];
                $scope.num = 'DI' + (Math.ceil(Math.random() * 1000));

            }

        }


        $scope.showPerDetails=function(){
            var id=this.viewst_id;
            $http.get("http://gemstonelive.azurewebsites.net/api/perItemDetails/"+id)
                .success(function(res){
                    $scope.getItemDetailsByStone=res;
                    var test=$scope.getItemDetailsByStone;
                    $scope.id=test.id;
                    $scope.userNames= test.userNames;
                    $scope.preSemi=test.preSemi;
                    $scope.pType=test.pType;
                    $scope.sName=test.sName;
                    $scope.stoneSize=test.stoneSize;
                    $scope.sWeight=test.sWeight;
                    $scope.sPieces=test.sPieces;
                    $scope.sDimensions=test.sDimensions;
                    $scope.sColor=test.sColor;
                    $scope.sQuality=test.sQuality;
                    $scope.stoneShape=test.stoneShape;
                    $scope.sOrigin=test.sOrigin;
                    $scope.sRemark=test.sRemark;
                    $scope.scerAgency=test.scerAgency;
                    $scope.sCarat=test.sCarat;
                    $scope.stockId=test.stockId;
                    $scope.sSupplierRef=test.sSupplierRef;
                    $scope.sPurchase=test.sPurchase;
                    $scope.image1=test.image1;
                    $scope.image2=test.image2;
                    $scope.image3=test.image3;
                })
        };




        $http.get("http://gemstonelive.azurewebsites.net/api/perItemDetails")
            .success(function(res){
                $scope.getPerItemDetails=res;
                var totalItems=res.length;
                $scope.totalItems=totalItems;

            });


        var template = '<ion-popover-view><ion-header-bar><h1 class="title">Settings</h1></ion-header-bar><ion-content><div class="list"><a class="item" target="_blank" ui-sref="changepassword" ng-click="changePass();hidePopover()">Change Password</a><a class="item" target="_blank" ng-click="hidePopover();logout()">Logout</a></div></ion-content></ion-popover-view>';

        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        });

        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('my-popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });

        $scope.pictureUrl = "http://placehold.it/100x100";
        $scope.pictureUrl1 = "http://placehold.it/100x100";
        $scope.pictureUrl2 = "http://placehold.it/100x100";


        $scope.takePicture = function () {

            if (count == 0) {

                var options = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG
                };
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    //console.log('camera data: ' + angular.toJSON(imageData));
                    $scope.imgdata1 = imageData;
                    $scope.pictureUrl = 'data:image/jpeg;base64,' + imageData;
                    //$scope.blobImg = dataURItoBlob($scope.pictureUrl);
                    window.alert("Picture Captured .. !!");
                    count++;
                }, function (err) {
                    //console.log('camera error: ' + angular.toJSON(imageData));
                    window.alert('Error: ' + err.message);
                });
            };

            if (count == 1) {
                var options = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG
                };
                $cordovaCamera.getPicture(options).then(function (imageData1) {
                    //console.log('camera data: ' + angular.toJSON(imageData));
                    $scope.imgdata2 = imageData1;
                    $scope.pictureUrl1 = 'data:image/jpeg;base64,' + imageData1;
                    //$scope.blobImg = dataURItoBlob($scope.pictureUrl);
                    window.alert("Picture Captured .. !!");
                    count++;
                }, function (err) {
                    //console.log('camera error: ' + angular.toJSON(imageData));
                    window.alert('Error: ' + err.message);
                });
            };


            if (count > 1) {
                var options = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    encodingType: Camera.EncodingType.JPEG
                };
                $cordovaCamera.getPicture(options).then(function (imageData2) {
                    //console.log('camera data: ' + angular.toJSON(imageData));
                    $scope.imgdata3 = imageData2;
                    $scope.pictureUrl2 = 'data:image/jpeg;base64,' + imageData2;
                    //$scope.blobImg = dataURItoBlob($scope.pictureUrl);
                    window.alert("Picture Captured .. !!");
                    count++;
                }, function (err) {
                    //console.log('camera error: ' + angular.toJSON(imageData));
                    window.alert('Error: ' + err.message);
                });
            };

        };

        $scope.takePhoto = function () {
            if (count1 == 0) {
                var options = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                    encodingType: Camera.EncodingType.JPEG
                };
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.imgdata1 = imageData;
                    $scope.pictureUrl = 'data:image/jpeg;base64,' + imageData;
                    //$scope.blobImg = dataURItoBlob($scope.pictureUrl);
                    window.alert("Picture Captured .. !!");
                    count1++;
                }, function (err) {
                    window.alert('Error:' + err.message);
                });
            };

            if (count1 == 1) {
                var options = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                    encodingType: Camera.EncodingType.JPEG
                };
                $cordovaCamera.getPicture(options).then(function (imageData1) {
                    $scope.imgdata2 = imageData1;
                    $scope.pictureUrl1 = 'data:image/jpeg;base64,' + imageData1;
                    //$scope.blobImg = dataURItoBlob($scope.pictureUrl);
                    window.alert("Picture Captured .. !!");
                    count1++;
                }, function (err) {
                    window.alert('Error:' + err.message);
                });
            };

            if (count1 > 1) {
                var options = {
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                    encodingType: Camera.EncodingType.JPEG
                };
                $cordovaCamera.getPicture(options).then(function (imageData2) {
                    $scope.imgdata3 = imageData2;
                    $scope.pictureUrl2 = 'data:image/jpeg;base64,' + imageData2;
                    //$scope.blobImg = dataURItoBlob($scope.pictureUrl);
                    window.alert("Picture Captured .. !!");
                    count1++;
                }, function (err) {
                    window.alert('Error:' + err.message);
                });
            };

        };


        $scope.logout=function(){
            //$state.go('login');
            window.location = "index.html";
        };


        $scope.enter = function ()
        {
            //alert(user);
            var purchaseType = this.purchasetype;
            var radioSelected=$scope.strType;
            var stoneName=$scope.strStone;
            var size=this.sizesize;
            var weight=this.weightweight;
            var pieces=this.piecespieces;
            var dimensions=this.dimensions;
            var color=this.colorco;
            var shape=this.shapeshape;
            var origin=this.originor;
            var treatment=this.treat;
            var Quality=this.Quality;
            var certificates=this.certi;
            var carat=this.salesPrice;
            var stock_id=$scope.num;
            var supplierCert=this.certificatenum;
            var pur_price=this.purchase;
            var img1 = $scope.imgdata1;
            var img2 = $scope.imgdata2;
            var img3 = $scope.imgdata3;
//alert(radioSelected);

            var request = $http({
                method: "post",
                url: "http://gemstonelive.azurewebsites.net/api/itemDetails",
                crossDomain: true,
                data: {
                    userNames: user,
                    pType: purchaseType,
                    preSemi : radioSelected,
                    sName :stoneName ,
                    stoneSize : size,
                    sWeight: weight,
                    sDimensions: dimensions,
                    sPieces : pieces,
                    sColor: color,
                    stoneShape :shape,
                    sOrigin :origin,
                    sRemark : treatment,
                    sQuality : Quality,
                    scerAgency : certificates,
                    sCarat : carat,
                    stockId : stock_id,
                    sSupplierRef : supplierCert,
                    sPurchase : pur_price,
                    image1 : img1,
                    image2 : img2,
                    image3 : img3
                },
                headers: {'Content-Type': 'application/json'}
            })
                .success(function (resp) {

                    //alert(resp);
                    //further code will refresh the current database data on page

                    var alertPopup = $ionicPopup.alert({
                        title: 'Successful!!',
                        template: 'Your stone has been added and requested to admin..!!'
                    });
                    //window.location='./main.html';
                });
            $http.get('http://gemstonelive.azurewebsites.net/api/itemDetails')
                .success(function (res) {
                    $scope.getItemDetails=res;
                    var getItemDetails=$scope.getItemDetails;
                    var len=res.length;
                    $scope.len=len;
                    $state.reload();
                });//alert("success");

            // alert("second line");
            this.purchasetype = "";
            this.rad1 = "";
            this.stonename= "";
            this.sizesize = "";
            this.weightweight = "";
            this.piecespieces = "";
            this.dimensions = "";
            this.colorco = "";
            this.Quality = "",
            this.shapeshape= "";
            this.originor="";
            this.treatment="";
            this.certi="";
            this.salesPrice="";
            this.stockid="";
            this.certificatenum="";
            this.purchase="";
            $scope.pictureUrl="http://placehold.it/100x100";
            $scope.pictureUrl1="http://placehold.it/100x100";
            $scope.pictureUrl2="http://placehold.it/100x100";

            $state.reload();
        }
    })




    .controller('AccountCtrl', function($scope,$http,$ionicPopover,$ionicPopup,$ionicModal,$state) {

        var template = '<ion-popover-view><ion-header-bar><h1 class="title">Settings</h1></ion-header-bar><ion-content><div class="list"><a class="item" target="_blank" ui-sref="changepassword" ng-click="hidePopover()">Change Password</a><a class="item" target="_blank" ng-click="hidePopover();logout()">Logout</a></div></ion-content></ion-popover-view>';

        $scope.popover = $ionicPopover.fromTemplate(template, {
            scope: $scope
        });

        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('my-popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });

        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };
        //Cleanup the popover when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        // Execute action on hide popover
        $scope.$on('popover.hidden', function() {
            // Execute action
        });
        // Execute action on remove popover
        $scope.$on('popover.removed', function() {
            // Execute action
        });

        $ionicModal.fromTemplateUrl('my-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
        });
        $scope.openModal = function() {
            $scope.modal.show();
        };
        $scope.closeModal = function() {
            $scope.modal.hide();
        };
        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function() {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function() {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function() {
            // Execute action
        });

        $scope.logout=function(){
            //$state.go('login');
            window.location = "index.html";
        };

        $scope.getDemandStone = function(){
            $scope.strStn = $("#stn option:selected").text();
            stnName = $scope.strStn;
        }

        $scope.sto = function(){
            if(stnName == 'Ruby'){
                $scope.colus = ['Vivid Red','Piegon Blood','Red'];
            }
            if(stnName == 'Sapphire'){
                $scope.colus = ['Royal Blue','Corn Flower Blue','Blue','Deep Blue'];
            }
            if(stnName == 'Emerald'){
                $scope.colus = ['Green','Deep Green','Light Green'];
            }
            if(stnName == 'Rubellite'){
                $scope.colus = ['Red','Pinkish Red','Orangish Red'];
            }
            if(stnName == 'Tanzanite'){
                $scope.colus = ['Purple Blue','Deep Blue','Light Blue'];
            }
            if(stnName == 'Green Tourmaline'){
                $scope.colus = ['Light Green','Deep Green'];
            }
            if(stnName == 'Diamonds(White)'){
                $scope.colus = ['Creame White','White'];
            }
            if(stnName == 'Diamonds(Yellow)'){
                $scope.colus = ['Creame White','White','Yellow'];
            }

        }


        $scope.enterDemand = function () {
            var dimensionsDemand = this.demand_dimensions;
            var demandPieces=this.demand_pieces;
            var demandShape=this.demand_shape;
            var demandColor=this.demand_color;
            var demandSize=this.demand_size;
            var demandStone=this.demand_stone;

//alert(radioSelected);

            var request = $http({
                method: "post",
                url: "http://gemstonelive.azurewebsites.net/api/demandRequests",
                crossDomain: true,
                data: {
                    Size: demandSize,
                    Color: demandColor,
                    Shape : demandShape,
                    Dimension : dimensionsDemand,
                    Pieces: demandPieces,
                    UserName: user,
                    StoneName: demandStone
                },
                headers: {'Content-Type': 'application/json'}
            })
                .success(function (resp) {

                    //alert(resp);
                    //further code will refresh the current database data on page

                    var alertPopup = $ionicPopup.alert({
                        title: 'Successful!!',
                        template: 'Your demand is requested to admin..!!'
                    });
                    //window.location='./main.html';
                });
        }


        var id=this.st_id;


        $http.get("http://gemstonelive.azurewebsites.net/api/itemDetails?name_user="+user)
            .success(function(res) {
                $scope.getItemDetails = res;
                var test = $scope.getItemDetails;
                $scope.id = test.id;
                $scope.userNames = test.userNames;
                $scope.sName = test.sName;
            });


        $scope.showDetail=function(){

            var id=this.st_id;

            $http.get("http://gemstonelive.azurewebsites.net/api/itemDetails/" + id)
                .success(function(res){
                    $scope.getItemDetailsByStone=res;
                    var test=$scope.getItemDetailsByStone;
                    $scope.id=test.id;
                    $scope.userNames= test.userNames;
                    $scope.preSemi=test.preSemi;
                    $scope.pType=test.pType;
                    $scope.sName=test.sName;
                    $scope.stoneSize=test.stoneSize;
                    $scope.sWeight=test.sWeight;
                    $scope.sPieces=test.sPieces;
                    $scope.sDimensions=test.sDimensions;
                    $scope.sColor=test.sColor;
                    $scope.sQuality=test.sQuality;
                    $scope.stoneShape=test.stoneShape;
                    $scope.sOrigin=test.sOrigin;
                    $scope.sRemark=test.sRemark;
                    $scope.scerAgency=test.scerAgency;
                    $scope.sCarat=test.sCarat;
                    $scope.stockId=test.stockId;
                    $scope.sSupplierRef=test.sSupplierRef;
                    $scope.sPurchase=test.sPurchase;
                    $scope.image1=test.image1;
                    $scope.image2=test.image2;
                    $scope.image3=test.image3;

                })
        };

    });

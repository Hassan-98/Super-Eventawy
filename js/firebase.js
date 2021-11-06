/* 
                ------------------------------------------------------------------
                |     Author ::::::::::    Hassan Ali                             |
                |     Title :::::::::::    Super Eventawy                         |
                |     Tools Used ::::::    Bootstrap & SASS & jQuery & Firebase   |
                |     Date of Start :::    4-2-2019                               |
                |     Date of End :::::    20-2-2019                              |   
                ------------------------------------------------------------------

*/

/************************************** Hassan Ali ***************************************/
/*************** THE CODE IS OBFUSCATED DUE TO THE PROGRAMMER's COPYRIGHTS ***************/
/************************************** Hassan Ali ***************************************/

var config = {
    apiKey: 'AIzaSyAbjsvvfT4mh8NJ-YY_mf0vkiPFTTNnbUc',
    authDomain: 'super-eventawy.firebaseapp.com',
    databaseURL: 'https://super-eventawy.firebaseio.com',
    projectId: 'super-eventawy',
    storageBucket: 'super-eventawy.appspot.com',
    messagingSenderId: '770975676167'
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user){
    setTimeout(function(){$(".loader").fadeOut();}, 2000);
});

setTimeout(function() {
    var ref = firebase.database().ref('background/');
    ref.once('value', function(snapshot) {
        var data = snapshot.val();
        var background = data.backgroundURL;
        $('header.main').css('background', 'url(' + background + ') fixed no-repeat');
        $('header.main').css('background-size', '100% 100%')
    })
}, 0);

setTimeout(function() {
    var ref = firebase.database().ref('background/');
    ref.once('value', function(snapshot) {
        var data = snapshot.val();
        var background = data.backgroundURL;
        $('header.alternative').css('background', 'url(' + background + ') fixed no-repeat');
        $('header.alternative').css('background-size', '100% 100%')
    })
}, 0);

$('.signupBTN').click(function() {
    var email = $('.email').val(),
        password = $('.pass').val(),
        username = $('.user-name').val(),
        phoneNumber = $('.tel').val(),
        address = $('.place').val(),
        aboutMe = $('.aboutme').val(),
        file = $('#profile-picture').get(0).files[0];
    $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
    if (email != '' && password != '' && username != '' && phoneNumber != '' && address != '' && aboutMe != '' && file != undefined) {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
            var user = firebase.auth().currentUser;
            var metadata = {
                contentType: file.type
            };
            firebase.storage().ref('images/' + user.uid + '/ProfileImage').put(file, metadata).then(function() {
                firebase.storage().ref('images/' + user.uid + '/ProfileImage').getDownloadURL().then(function(url) {
                    user.updateProfile({
                        displayName: username,
                        photoURL: url,
                        phoneNumber: phoneNumber,
                        address: address,
                        uid: user.uid
                    });
                    firebase.database().ref('users/' + user.uid).set({
                        displayName: username,
                        emailAddress: email,
                        phoneNumber: phoneNumber,
                        address: address,
                        aboutMe: aboutMe,
                        photoURL: url,
                        uid: user.uid,
                        adminChecker: false
                    }).then(setTimeout(function() {
                        var user = firebase.auth().currentUser;
                        if (user && url) {
                            location.href = 'index.html'
                        }
                    }, 2500))
                })
            })
        }).catch(function(error) {
            var message = error.message;
            alert(message);
            $('.signupBTN').html('التسجيل')
        })
    } else {
        alert('يجب التأكد من ملئ جميع الحقول بالبيانات');
        $(this).html('التسجيل')
    }
});
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var _0x7daex12 = firebase.database().ref('users/' + user.uid);
        _0x7daex12.once('value', function(snapshot) {
            var data = snapshot.val();
            var name = data.displayName;
            var photoURL = data.photoURL;
            var admin = data.adminChecker;
            $('.signedOut').hide();
            $('.signedIn').css('display', 'inline-block');
            $('.auth-name').text(name);
            $('.auth-img').attr('src', photoURL);
            if (admin == false) {
                $('.user-cp').hide();
                if (location.pathname === '/control-panel.html') {
                    location.href = 'index.html'
                }
            } else {
                setTimeout(function() {
                    if (location.pathname === '/news-details.html') {
                        $('.ReciveComments .comments .delete-comment').show()
                    };
                    if (location.pathname === '/gallery.html' || location.pathname === '/about.html') {
                        $('.ReciveImages .image-div .delete-photo').show()
                    }
                }, 2100)
            }
        })
    }
});
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (location.pathname === '/login.html' || location.pathname === '/forget.html') {
            location.href = 'index.html'
        }
    } else {
        if (location.pathname === '/profile.html' || location.pathname === '/control-panel.html' || location.pathname === '/registration.html') {
            alert('يجب تسجيل الدخول أولا قبل الدخول إلى هذه الصفحة');
            location.href = 'login.html'
        }
    }
});

setTimeout(function() {
    var user = firebase.auth().currentUser;
    if (user) {
        if (location.pathname === '/signup.html') {
            location.href = 'index.html'
        }
    }
}, 2000);

$('.signInBTN').click(function() {
    var email = $('.email').val(),
        password = $('.pass').val();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        var message = error.message;
        alert(message)
    }).then(setTimeout(function() {
        var user = firebase.auth().currentUser;
        if (user) {
            location.href = 'index.html'
        }
    }, 1000))
});

$('.user-out').click(function() {
    firebase.auth().signOut().then(location.reload())
});

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var ref = firebase.database().ref('users/' + user.uid);
        ref.once('value', function(snapshot) {
            var data = snapshot.val();
            var name = data.displayName;
            var photoURL = data.photoURL;
            var admin = data.adminChecker;
            var phoneNumber = data.phoneNumber;
            var address = data.address;
            var aboutMe = data.aboutMe;
            var emailAddress = data.emailAddress;
            $('.profile-image').attr('src', photoURL);
            $('.profile-username').text(name);
            $('.about-me').text(aboutMe);
            $('.profile-phone').text(phoneNumber);
            $('.profile-email').text(emailAddress);
            $('.profile-address').text(address);
            if (admin) {
                $('.rank').text('مشرف')
            } else {
                $('.rank').text('عضو')
            }
        })
    }
});

$('.username-editBTN').click(function() {
    $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref('users/' + user.uid);
    var username = $('.username-edit').val();
    if (username != '') {
        user.updateProfile({
            displayName: username
        });
        ref.once('value', function(snapshot) {
            var data = snapshot.val();
            let name = data.displayName;
            ref.update({
                displayName: username
            }).then(function() {
                var ref = firebase.database().ref('news/').orderByKey();
                ref.once('value', function(snapshot) {
                    var allData = Object.values(snapshot.val());
                    for (var i = 0; i < allData.length; i++) {
                        let ID = JSON.stringify(allData[i].newsID);
                        var ref2 = firebase.database().ref('news/' + ID + '/comments/');
                        ref2.once('value', function(snapshot) {
                            var alldata = Object.values(snapshot.val());
                            for (var i = 0; i < alldata.length; i++) {
                                var dataname = JSON.stringify(alldata[i].name).substr(1).slice(0, -1);
                                if (dataname == name) {
                                    var commentId = JSON.stringify(alldata[i].commentID);
                                    var ref6 = firebase.database().ref('news/' + ID + '/comments/' + commentId);
                                    ref6.update({
                                        name: username
                                    }).then(function() {
                                        var ref = firebase.database().ref('news/').orderByKey();
                                        ref.once('value', function(snapshot) {
                                            var allData = Object.values(snapshot.val());
                                            for (var i = 0; i < allData.length; i++) {
                                                let ID = JSON.stringify(allData[i].newsID);
                                                var dataname = JSON.stringify(allData[i].newsPublisher).substr(1).slice(0, -1);
                                                if (dataname == name) {
                                                    var newsRef = firebase.database().ref('news/' + ID);
                                                    newsRef.update({
                                                        newsPublisher: username
                                                    })
                                                }
                                            }
                                        })
                                    })
                                }
                            }
                        })
                    }
                }).then(setTimeout(function() {
                    location.reload()
                }, 4000))
            })
        })
    } else {
        alert('يجب إدخال بيانات أولا');
        $(this).html('تعديل')
    }
});

$('.email-editBTN').click(function() {
    $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref('users/' + user.uid);
    var email = $('.email-edit').val();
    if (email != '') {
        user.updateEmail(email).catch(function(error) {
            var message = error.message;
            alert(message);
        });
        ref.update({
            emailAddress: email
        }).then(setTimeout(function() {
            location.reload()
        }, 1000))
    } else {
        alert('يجب إدخال بيانات أولا');
        $(this).html('تعديل')
    }
});

$('.phone-editBTN').click(function() {
    $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref('users/' + user.uid);
    var phoneNumber = $('.phone-edit').val();
    if (phoneNumber != '') {
        user.updateProfile({
            phoneNumber: phoneNumber
        });
        ref.update({
            phoneNumber: phoneNumber
        }).then(setTimeout(function() {
            location.reload()
        }, 1000))
    } else {
        alert('يجب إدخال بيانات أولا');
        $(this).html('تعديل')
    }
});

$('.address-editBTN').click(function() {
    $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref('users/' + user.uid);
    var address = $('.address-edit').val();
    if (address != '') {
        user.updateProfile({
            address: address
        });
        ref.update({
            address: address
        }).then(setTimeout(function() {
            location.reload()
        }, 1000))
    } else {
        alert('يجب إدخال بيانات أولا');
        $(this).html('تعديل')
    }
});

$('.aboutme-editBTN').click(function() {
    $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref('users/' + user.uid);
    var aboutme = $('.aboutme-edit').val();
    if (aboutme != '') {
        ref.update({
            aboutMe: aboutme
        }).then(setTimeout(function() {
            location.reload()
        }, 1000))
    } else {
        alert('يجب إدخال بيانات أولا');
        $(this).html('تعديل')
    }
});

$('.photo-editBTN').click(function() {
    $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
    var user = firebase.auth().currentUser;
    var ref = firebase.database().ref('users/' + user.uid);
    var file = $('.photo-edit').get(0).files[0];
    if (file != undefined) {
        var metadata = {
            contentType: file.type
        };
        firebase.storage().ref('images/' + user.uid + '/ProfileImage').put(file, metadata).then(function() {
            firebase.storage().ref('images/' + user.uid + '/ProfileImage').getDownloadURL().then(function(url) {
                ref.once('value', function(snapshot) {
                    var data = snapshot.val();
                    let username = data.displayName;
                    ref.update({
                        photoURL: url
                    }).then(function() {
                        var ref = firebase.database().ref('news/').orderByKey();
                        ref.once('value', function(snapshot) {
                            var allData = Object.values(snapshot.val());
                            for (var i = 0; i < allData.length; i++) {
                                let ID = JSON.stringify(allData[i].newsID);
                                var ref2 = firebase.database().ref('news/' + ID + '/comments/');
                                ref2.once('value', function(snapshot) {
                                    var alldata = Object.values(snapshot.val());
                                    for (var i = 0; i < alldata.length; i++) {
                                        var ref9 = JSON.stringify(alldata[i].name).substr(1).slice(0, -1);
                                        if (ref9 == username) {
                                            var commentId = JSON.stringify(alldata[i].commentID);
                                            var ref6 = firebase.database().ref('news/' + ID + '/comments/' + commentId);
                                            ref6.update({
                                                photo: url
                                            }).then(setTimeout(function() {
                                                if (user && url) {
                                                    location.reload()
                                                }
                                            }, 1800))
                                        }
                                    }
                                })
                            }
                        }).then(setTimeout(function() {
                            location.reload()
                        }, 5000))
                    })
                })
            })
        })
    } else {
        alert('يجب إختيار صورة أولا');
        $(this).html('تعديل')
    }
});

$('.password-editBTN').click(function() {
    $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
    var user = firebase.auth().currentUser;
    var refa = $('.newpass-edit').val();
    if (refa != '') {
        user.updatePassword(refa).catch(function(error) {
            var message = error.message;
            alert(message);
            location.reload()
        }).then(setTimeout(function() {
            location.reload()
        }, 1000))
    } else {
        alert('يجب إدخال بيانات أولا');
        $(this).html('تعديل')
    }
});

$('.reset-password').click(function() {
    var emailAddress = $('.reset-email').val();
    firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
        alert('تم إرسال كلمة مرور جديدة إلى بريدك الالكتروني');
        location.href = 'login.html'
    }).catch(function(error) {
        var message = error.message;
        alert(message)
    })
});

if (location.pathname == '/control-panel.html') {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var refb = firebase.database().ref('users/');
            refb.once('value', function(snapshot) {
                var allData = Object.values(snapshot.val());
                for (var i = 0; i < allData.length; i++) {
                    var displayName = JSON.stringify(allData[i].displayName).substr(1).slice(0, -1);
                    var address = JSON.stringify(allData[i].address).substr(1).slice(0, -1);
                    var phoneNumber = JSON.stringify(allData[i].phoneNumber).substr(1).slice(0, -1);
                    var email = JSON.stringify(allData[i].emailAddress).substr(1).slice(0, -1);
                    var admin = JSON.stringify(allData[i].adminChecker);
                    var id = JSON.stringify(allData[i].uid).substr(1).slice(0, -1);
                    var tr = '<tr><td class=\'u-name\'></td><td class=\'u-address\'></td><td class=\'u-phone\'></td><td class=\'u-email\'></td><td class=\'u-rank\'></td><td class=\'u-promote\'><button class=\'promote\'>\u062A\u0631\u0642\u064A\u0629</button></td></tr>';
                    $('.table-members').append(tr);
                    $('.table-members tr:last-child').attr('id', id);
                    $('.table-members tr:last-child .u-name').text(displayName);
                    $('.table-members tr:last-child .u-address').text(address);
                    $('.table-members tr:last-child .u-phone').text(phoneNumber);
                    $('.table-members tr:last-child .u-email').text(email);
                    if (admin == 'true') {
                        $('.table-members tr:last-child .u-rank').text('مشرف');
                        $('.table-members tr:last-child .promote').attr('disabled', 'disabled')
                    } else {
                        $('.table-members tr:last-child .u-rank').text('عضو')
                    }
                }
            });
            $('.table-members').on('click', '.promote', function() {
                var Id = $(this).parents('tr').attr('id');
                var ref = firebase.database().ref('users/' + Id);
                ref.update({
                    adminChecker: true
                }).catch(function(error) {
                    var message = error.message;
                    alert(message)
                }).then(function() {
                    location.reload()
                })
            })
        }
    });

    $('.add-course-btn').click(function() {
        $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
        var courseName = $('.add-course-name').val(),
            coursePrice = $('.add-course-price').val(),
            courseDuration = $('.add-course-duration').val(),
            courseStudents = $('.add-course-students').val(),
            courseDetails = $('.add-course-about').val(),
            courseDate = $('.add-course-date').val(),
            courseTeacher = $('.add-course-teacher').val();
        let snapshot8 = 1;
        var ref = firebase.database().ref('courses/');
        ref.once('value', function(snapshot) {
            var allData = Object.values(snapshot.val());
            for (var i = 0; i < allData.length; i++) {
                var data0 = JSON.stringify(allData[allData.length - 1].courseID);
                var data1 = Number(data0);
                snapshot8 = data1 + 1
            }
        }).then(function() {
            var snapshota = $('.add-course-picture').get(0).files[0];
            var snapshotb = $('.add-course-teacherPic').get(0).files[0];
            if (courseName != '' && coursePrice != '' && courseDuration != '' && courseStudents != '' && courseDetails != '' && courseDate != '' && courseTeacher != '' && snapshota != undefined && snapshotb != undefined) {
                var ref = firebase.database().ref('courses/' + snapshot8);
                ref.set({
                    courseName: courseName,
                    coursePrice: coursePrice,
                    courseDuration: courseDuration,
                    courseStudents: courseStudents,
                    courseDetails: courseDetails,
                    courseDate: courseDate,
                    courseTeacher: courseTeacher,
                    courseID: snapshot8
                });
                var snapshotc = {
                    contentType: snapshota.type
                };
                var snapshotd = {
                    contentType: snapshotb.type
                };
                firebase.storage().ref('courses/' + snapshot8 + '/coursePic').put(snapshota, snapshotc).then(function() {
                    firebase.storage().ref('courses/' + snapshot8 + '/coursePic').getDownloadURL().then(function(url) {
                        ref.update({
                            coursePic: url
                        })
                    })
                });
                firebase.storage().ref('courses/' + snapshot8 + '/courseTeacherPic').put(snapshotb, snapshotd).then(function() {
                    firebase.storage().ref('courses/' + snapshot8 + '/courseTeacherPic').getDownloadURL().then(function(url) {
                        ref.update({
                            courseTeacherPic: url
                        })
                    })
                });
                setTimeout(function() {
                    ref.on('value', function(snapshot) {
                        var data = snapshot.val();
                        var snapshote = data.coursePic;
                        var snapshotf = data.courseTeacherPic;
                        if (snapshote && snapshotf) {
                            location.reload()
                        }
                    })
                }, 3000)
            } else {
                alert('يجب إدخال جميع البيانات أولا');
                $('.add-course-btn').html('إضافة الكورس')
            }
        })
    });

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var data2 = firebase.database().ref('courses/').orderByKey();
            data2.once('value', function(snapshot) {
                var allData = Object.values(snapshot.val());
                for (var i = 0; i < allData.length; i++) {
                    var courseName = JSON.stringify(allData[i].courseName).substr(1).slice(0, -1);
                    var coursePrice = JSON.stringify(allData[i].coursePrice).substr(1).slice(0, -1);
                    var courseDuration = JSON.stringify(allData[i].courseDuration).substr(1).slice(0, -1);
                    var courseStudents = JSON.stringify(allData[i].courseStudents).substr(1).slice(0, -1);
                    var courseDate = JSON.stringify(allData[i].courseDate).substr(1).slice(0, -1);
                    var courseTeacher = JSON.stringify(allData[i].courseTeacher).substr(1).slice(0, -1);
                    var courseDetails = JSON.stringify(allData[i].courseDetails).substr(1).slice(0, -1);
                    var id = JSON.stringify(allData[i].courseID);
                    var tr = '<tr><td class=\'show-course-name\'></td><td class=\'show-course-price\'></td><td class=\'show-course-duration\'>3 </td><td class=\'show-course-students\'>45</td><td class=\'show-course-teacher\'></td><td class=\'show-course-date\'>22-03-2019</td><td class=\'hiddenDetails\'></td><td><button class=\'edit-course\'>تعديل</button></td><td><button class=\'delete-course\'>حذف</button></td></tr>';
                    $('.table-courses').append(tr);
                    $('.table-courses tr:last-child').attr('id', id);
                    $('.table-courses tr:last-child .show-course-name').text(courseName);
                    $('.table-courses tr:last-child .show-course-price').text(coursePrice + 'ج');
                    $('.table-courses tr:last-child .show-course-duration').text(courseDuration);
                    $('.table-courses tr:last-child .show-course-students').text(courseStudents);
                    $('.table-courses tr:last-child .show-course-teacher').text(courseTeacher);
                    $('.table-courses tr:last-child .show-course-date').text(courseDate);
                    $('.table-courses tr:last-child .hiddenDetails').text(courseDetails)
                };
                setTimeout(function() {
                    $('.table-courses tr:nth-of-type(2)').hide()
                }, 1800)
            });
            $('.table-courses').on('click', '.delete-course', function() {
                var Id = $(this).parents('tr').attr('id');
                var ref = firebase.database().ref('courses/' + Id);
                var data3 = confirm('هل أنت متأكد أنك تريد حذف هذا الكورس ؟');
                if (data3) {
                    ref.remove().catch(function(error) {
                        var message = error.message;
                        alert(message)
                    });
                    firebase.storage().ref('courses/' + Id + '/coursePic').delete().catch(function(error) {
                        var message = error.message;
                        alert(message)
                    });
                    firebase.storage().ref('courses/' + Id + '/courseTeacherPic').delete().catch(function(error) {
                        var message = error.message;
                        alert(message)
                    });
                    setTimeout(function() {
                        ref.on('value', function(snapshot) {
                            var data = snapshot.val();
                            if (!data) {
                                location.reload()
                            }
                        })
                    }, 1500)
                }
            });
            $('.table-courses').on('click', '.edit-course', function() {
                $('.control-courses-div').hide();
                $('.edit-courses-div').show();
                var Id = $(this).parents('tr').attr('id');
                $('.edits-container').attr('id', Id);
                var courseName = $(this).parents('tr').children('.show-course-name').text();
                var coursePrice = $(this).parents('tr').children('.show-course-price').text().slice(0, -1);
                var courseDuration = $(this).parents('tr').children('.show-course-duration').text();
                var courseStudents = $(this).parents('tr').children('.show-course-students').text();
                var courseTeacher = $(this).parents('tr').children('.show-course-teacher').text();
                var date = $(this).parents('tr').children('.show-course-date').text();
                var hiddenDetails = $(this).parents('tr').children('.hiddenDetails').text();
                $('.course-name-edit').val(courseName);
                $('.course-price-edit').val(coursePrice);
                $('.course-duration-edit').val(courseDuration);
                $('.course-students-edit').val(courseStudents);
                $('.course-teachname-edit').val(courseTeacher);
                $('.course-date-edit').val(date);
                $('.course-details-edit').val(hiddenDetails);
                $('.course-name-editBTN').click(function() {
                    var datac = $('.edits-container').attr('id');
                    var data = $('.course-name-edit').val();
                    var ref = firebase.database().ref('courses/' + datac);
                    ref.update({
                        courseName: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.course-price-editBTN').click(function() {
                    var datac = $('.edits-container').attr('id');
                    var data = $('.course-price-edit').val();
                    var ref = firebase.database().ref('courses/' + datac);
                    ref.update({
                        coursePrice: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.course-duration-editBTN').click(function() {
                    var datac = $('.edits-container').attr('id');
                    var data = $('.course-duration-edit').val();
                    var ref = firebase.database().ref('courses/' + datac);
                    ref.update({
                        courseDuration: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.course-students-editBTN').click(function() {
                    var datac = $('.edits-container').attr('id');
                    var data = $('.course-students-edit').val();
                    var ref = firebase.database().ref('courses/' + datac);
                    ref.update({
                        courseStudents: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.course-teachname-editBTN').click(function() {
                    var datac = $('.edits-container').attr('id');
                    var data = $('.course-teachname-edit').val();
                    var ref = firebase.database().ref('courses/' + datac);
                    ref.update({
                        courseTeacher: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.course-date-editBTN').click(function() {
                    var datac = $('.edits-container').attr('id');
                    var data = $('.course-date-edit').val();
                    var ref = firebase.database().ref('courses/' + datac);
                    ref.update({
                        courseDate: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.course-details-editBTN').click(function() {
                    var datac = $('.edits-container').attr('id');
                    var data = $('.course-details-edit').val();
                    var ref = firebase.database().ref('courses/' + datac);
                    ref.update({
                        courseDetails: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.course-pic-editBTN').click(function() {
                    var datac = $('.edits-container').attr('id');
                    var ref = firebase.database().ref('courses/' + datac);
                    var file = $('.course-pic-edit').get(0).files[0];
                    if (file != undefined) {
                        var metadata = {
                            contentType: file.type
                        };
                        firebase.storage().ref('courses/' + datac + '/coursePic').put(file, metadata).then(function() {
                            firebase.storage().ref('courses/' + datac + '/coursePic').getDownloadURL().then(function(url) {
                                ref.update({
                                    coursePic: url
                                }).then(function() {
                                    location.reload()
                                })
                            })
                        })
                    } else {
                        alert('يجب إرفاق صورة أولا')
                    }
                });
                $('.course-teachpic-editBTN').click(function() {
                    var datac = $('.edits-container').attr('id');
                    var ref = firebase.database().ref('courses/' + datac);
                    var file = $('.course-teachpic-edit').get(0).files[0];
                    if (file != undefined) {
                        var metadata = {
                            contentType: file.type
                        };
                        firebase.storage().ref('courses/' + datac + '/courseTeacherPic').put(file, metadata).then(function() {
                            firebase.storage().ref('courses/' + datac + '/courseTeacherPic').getDownloadURL().then(function(url) {
                                ref.update({
                                    courseTeacherPic: url
                                }).then(function() {
                                    location.reload()
                                })
                            })
                        })
                    } else {
                        alert('يجب إرفاق صورة أولا')
                    }
                })
            })
        }
    });
    $('.add-event-btn').click(function() {
        $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
        var datad = $('.add-event-name').val(),
            datae = $('.add-event-price').val(),
            dataf = $('.add-event-place').val(),
            _0x7daex50 = $('.add-event-date').val(),
            BODY = editorBodyNewEvent.document.getElementsByTagName('body')[0].innerHTML;
            _0x7daex52 = $('.add-event-time').val();
        let _0x7daex53 = 1;
        var ref = firebase.database().ref('events/');
        ref.once('value', function(snapshot) {
            var allData = Object.values(snapshot.val());
            for (var i = 0; i < allData.length; i++) {
                var data0 = JSON.stringify(allData[allData.length - 1].eventID);
                var data1 = Number(data0);
                _0x7daex53 = Number(data1 + 1)
            }
        }).then(function() {
            var ref = firebase.database().ref('events/' + _0x7daex53);
            var _0x7daex54 = $('.add-event-picture').get(0).files[0];
            if (datad != '' && datae != '' && dataf != '' && _0x7daex50 != '' && BODY != '' && _0x7daex52 != '' && _0x7daex54 != undefined) {
                ref.set({
                    eventName: datad,
                    eventPrice: datae,
                    eventPlace: dataf,
                    eventDate: _0x7daex50,
                    eventTime: _0x7daex52,
                    eventDetails: BODY,
                    eventID: _0x7daex53
                });
                var metadata = {
                    contentType: _0x7daex54.type
                };
                firebase.storage().ref('events/' + _0x7daex53 + '/eventPic').put(_0x7daex54, metadata).then(function() {
                    firebase.storage().ref('events/' + _0x7daex53 + '/eventPic').getDownloadURL().then(function(url) {
                        ref.update({
                            eventPic: url
                        })
                    })
                });
                setTimeout(function() {
                    ref.on('value', function(snapshot) {
                        var data = snapshot.val();
                        var _0x7daex55 = data.eventPic;
                        if (_0x7daex55) {
                            location.reload()
                        }
                    })
                }, 3000)
            } else {
                alert('يجب إدخال جميع البيانات أولا');
                $('.add-event-btn').html('إضافة \u0627\u0644\u0627\u064A\u0641\u064A\u0646\u062A')
            }
        })
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var getEventsData = firebase.database().ref('events/').orderByKey();
            getEventsData.once('value', function(snapshot) {
                var allData = Object.values(snapshot.val());
                for (var i = 0; i < allData.length; i++) {
                    var datad = JSON.stringify(allData[i].eventName).substr(1).slice(0, -1);
                    var datae = JSON.stringify(allData[i].eventPrice).substr(1).slice(0, -1);
                    var dataf = JSON.stringify(allData[i].eventPlace).substr(1).slice(0, -1);
                    var _0x7daex50 = JSON.stringify(allData[i].eventDate).substr(1).slice(0, -1);
                    var _0x7daex52 = JSON.stringify(allData[i].eventTime).substr(1).slice(0, -1);
                    var eventDetails = JSON.stringify(allData[i].eventDetails).substr(1).slice(0, -1);
                    var id = JSON.stringify(allData[i].eventID);
                    var tr = '<tr><td class=\'show-event-name\'></td><td class=\'show-event-price\'></td><td class=\'show-event-place\'></td><td class=\'show-event-date\'></td><td class=\'show-event-time\'></td><td><button class=\'edit-event\'>تعديل</button></td><td><button class=\'delete-event\'>\u062D\u0630\u0641</button></td><td class=\'hiddenDetails\'></td></tr>';
                    $('.table-events').append(tr);
                    $('.table-events tr:last-child').attr('id', id);
                    $('.table-events tr:last-child .show-event-name').text(datad);
                    $('.table-events tr:last-child .show-event-price').text(datae + '\u062C');
                    $('.table-events tr:last-child .show-event-place').text(dataf);
                    $('.table-events tr:last-child .show-event-time').text(_0x7daex52);
                    $('.table-events tr:last-child .show-event-date').text(_0x7daex50);
                    $('.table-events tr:last-child .hiddenDetails').text(eventDetails)
                };
                setTimeout(function() {
                    $('.table-events tr:nth-of-type(2)').hide()
                }, 1800)
            });
            $('.table-events').on('click', '.delete-event', function() {
                var Id = $(this).parents('tr').attr('id');
                var ref = firebase.database().ref('events/' + Id);
                var data3 = confirm('\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0623\u0646\u0643 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0627\u064A\u0641\u064A\u0646\u062A \u061F');
                if (data3) {
                    ref.remove().catch(function(error) {
                        var message = error.message;
                        alert(message)
                    });
                    firebase.storage().ref('events/' + Id + '/eventPic').delete().catch(function(error) {
                        var message = error.message;
                        alert(message)
                    });
                    setTimeout(function() {
                        ref.on('value', function(snapshot) {
                            var data = snapshot.val();
                            if (!data) {
                                location.reload()
                            }
                        })
                    }, 1500)
                }
            });
            $('.table-events').on('click', '.edit-event', function() {
                $('.control-events-div').hide();
                $('.edit-events-div').show();
                var Id = $(this).parents('tr').attr('id');
                $('.events-edits-container').attr('id', Id);
                var courseName = $(this).parents('tr').children('.show-event-name').text();
                var coursePrice = $(this).parents('tr').children('.show-event-price').text().slice(0, -1);
                var _0x7daex57 = $(this).parents('tr').children('.show-event-place').text();
                var _0x7daex58 = $(this).parents('tr').children('.show-event-time').text();
                var date = $(this).parents('tr').children('.show-event-date').text();
                var hiddenDetails = $(this).parents('tr').children('.hiddenDetails').text();
                $('.event-name-edit').val(courseName);
                $('.event-price-edit').val(coursePrice);
                $('.event-place-edit').val(_0x7daex57);
                $('.event-time-edit').val(_0x7daex58);
                $('.event-date-edit').val(date);
                editorBody.document.getElementsByTagName('body')[0].innerHTML = hiddenDetails;
                $('.event-name-editBTN').click(function() {
                    var datac = $('.events-edits-container').attr('id');
                    var data = $('.event-name-edit').val();
                    var ref = firebase.database().ref('events/' + datac);
                    ref.update({
                        eventName: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.event-price-editBTN').click(function() {
                    var datac = $('.events-edits-container').attr('id');
                    var data = $('.event-price-edit').val();
                    var ref = firebase.database().ref('events/' + datac);
                    ref.update({
                        eventPrice: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.event-place-editBTN').click(function() {
                    var datac = $('.events-edits-container').attr('id');
                    var data = $('.event-place-edit').val();
                    var ref = firebase.database().ref('events/' + datac);
                    ref.update({
                        eventPlace: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.event-time-editBTN').click(function() {
                    var datac = $('.events-edits-container').attr('id');
                    var data = $('.event-time-edit').val();
                    var ref = firebase.database().ref('events/' + datac);
                    ref.update({
                        eventTime: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.event-date-editBTN').click(function() {
                    var datac = $('.events-edits-container').attr('id');
                    var data = $('.event-date-edit').val();
                    var ref = firebase.database().ref('events/' + datac);
                    ref.update({
                        eventDate: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.event-details-editBTN').click(function() {
                    var datac = $('.events-edits-container').attr('id');
                    var BODY = editorBody.document.getElementsByTagName('body')[0].innerHTML;
                    var ref = firebase.database().ref('events/' + datac);
                    ref.update({
                        eventDetails: BODY
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.event-pic-editBTN').click(function() {
                    var datac = $('.events-edits-container').attr('id');
                    var ref = firebase.database().ref('events/' + datac);
                    var file = $('.event-pic-edit').get(0).files[0];
                    if (file != undefined) {
                        var metadata = {
                            contentType: file.type
                        };
                        firebase.storage().ref('events/' + datac + '/eventPic').put(file, metadata).then(function() {
                            firebase.storage().ref('events/' + datac + '/eventPic').getDownloadURL().then(function(url) {
                                ref.update({
                                    eventPic: url
                                }).then(function() {
                                    location.reload()
                                })
                            })
                        })
                    } else {
                        alert('يجب إرفاق صورة أولا')
                    }
                })
            })
        }
    });
    $('.add-news-btn').click(function() {
        $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
        var _0x7daex59 = $('.add-news-name').val(),
            newsDetails = editorBodyNewNews.document.getElementsByTagName('body')[0].innerHTML,
            dateNow = new Date().toLocaleDateString();
        let _0x7daex5c = 1;
        var ref = firebase.database().ref('news/');
        ref.once('value', function(snapshot) {
            var allData = Object.values(snapshot.val());
            for (var i = 0; i < allData.length; i++) {
                var data0 = JSON.stringify(allData[allData.length - 1].newsID);
                var data1 = Number(data0);
                _0x7daex5c = Number(data1 + 1)
            }
        }).then(function() {
            var ref = firebase.database().ref('news/' + _0x7daex5c);
            var user = firebase.auth().currentUser;
            var ref = firebase.database().ref('users/' + user.uid);
            ref.once('value', function(snapshot) {
                var data = snapshot.val();
                var name = data.displayName;
                var file = $('.add-news-picture').get(0).files[0];
                if (_0x7daex59 != '' && newsDetails != '' && file != undefined) {
                    ref.set({
                        newsName: _0x7daex59,
                        newsDate: dateNow,
                        newsDetails: newsDetails,
                        newsPublisher: name,
                        newsID: _0x7daex5c,
                        comments: {
                            0: {
                                name: '',
                                date: '',
                                photo: '',
                                commentText: '',
                                commentID: 0
                            }
                        }
                    });
                    var metadata = {
                        contentType: file.type
                    };
                    firebase.storage().ref('news/' + _0x7daex5c + '/newsPic').put(file, metadata).then(function() {
                        firebase.storage().ref('news/' + _0x7daex5c + '/newsPic').getDownloadURL().then(function(url) {
                            ref.update({
                                newsPic: url
                            })
                        })
                    });
                    setTimeout(function() {
                        ref.on('value', function(snapshot) {
                            var data = snapshot.val();
                            var _0x7daex5e = data.newsPic;
                            if (_0x7daex5e) {
                                location.reload()
                            }
                        })
                    }, 3000)
                } else {
                    alert('يجب إدخال جميع البيانات أولا');
                    $('.add-news-btn').html('إضافة الخبر')
                }
            })
        })
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var getEventsData = firebase.database().ref('news/').orderByKey();
            getEventsData.once('value', function(snapshot) {
                var allData = Object.values(snapshot.val());
                for (var i = 0; i < allData.length; i++) {
                    var _0x7daex59 = JSON.stringify(allData[i].newsName).substr(1).slice(0, -1);
                    var _0x7daex5a = JSON.stringify(allData[i].newsDetails).substr(1).slice(0, -1);
                    var _0x7daex5f = JSON.stringify(allData[i].newsPublisher).substr(1).slice(0, -1);
                    var id = JSON.stringify(allData[i].newsID);
                    var tr = '<tr><td class=\'show-news-name\'></td><td class=\'show-news-publisher\'></td><td><button class=\'edit-news\'>تعديل</button></td><td><button class=\'delete-news\'>\u062D\u0630\u0641</button></td><td class=\'hiddenDetails\'></td></tr>';
                    $('.table-news').append(tr);
                    $('.table-news tr:last-child').attr('id', id);
                    $('.table-news tr:last-child .show-news-name').text(_0x7daex59);
                    $('.table-news tr:last-child .show-news-publisher').text(_0x7daex5f);
                    $('.table-news tr:last-child .hiddenDetails').text(_0x7daex5a)
                };
                setTimeout(function() {
                    $('.table-news tr:nth-of-type(2)').hide()
                }, 1800)
            });
            $('.table-news').on('click', '.delete-news', function() {
                var Id = $(this).parents('tr').attr('id');
                var ref = firebase.database().ref('news/' + Id);
                var data3 = confirm('هل أنت متأكد أنك تريد حذف هذا الخبر ؟');
                if (data3) {
                    ref.remove().catch(function(error) {
                        var message = error.message;
                        alert(message)
                    });
                    firebase.storage().ref('news/' + Id + '/newsPic').delete().catch(function(error) {
                        var message = error.message;
                        alert(message)
                    });
                    setTimeout(function() {
                        ref.on('value', function(snapshot) {
                            var data = snapshot.val();
                            if (!data) {
                                location.reload()
                            }
                        })
                    }, 1500)
                }
            });
            $('.table-news').on('click', '.edit-news', function() {
                $('.control-news-div').hide();
                $('.edit-news-div').show();
                var Id = $(this).parents('tr').attr('id');
                $('.news-edits-container').attr('id', Id);
                var courseName = $(this).parents('tr').children('.show-news-name').text();
                var hiddenDetails = $(this).parents('tr').children('.hiddenDetails').text();
                $('.news-name-edit').val(courseName);
                editorBodyEditNews.document.getElementsByTagName('body')[0].innerHTML = hiddenDetails;
                $('.news-name-editBTN').click(function() {
                    var datac = $('.news-edits-container').attr('id');
                    var data = $('.news-name-edit').val();
                    var ref = firebase.database().ref('news/' + datac);
                    ref.update({
                        newsName: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.news-details-editBTN').click(function() {
                    var datac = $('.news-edits-container').attr('id');
                    var newsDetails = editorBodyEditNews.document.getElementsByTagName('body')[0].innerHTML;
                    var ref = firebase.database().ref('news/' + datac);
                    ref.update({
                        newsDetails: newsDetails
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.news-pic-editBTN').click(function() {
                    var datac = $('.news-edits-container').attr('id');
                    var ref = firebase.database().ref('news/' + datac);
                    var file = $('.news-pic-edit').get(0).files[0];
                    if (file != undefined) {
                        var metadata = {
                            contentType: file.type
                        };
                        firebase.storage().ref('news/' + datac + '/newsPic').put(file, metadata).then(function() {
                            firebase.storage().ref('news/' + datac + '/newsPic').getDownloadURL().then(function(url) {
                                ref.update({
                                    newsPic: url
                                }).then(function() {
                                    location.reload()
                                })
                            })
                        })
                    } else {
                        alert('يجب إرفاق صورة أولا')
                    }
                })
            })
        }
    });
    $('.add-member-btn').click(function() {
        $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
        var email0 = Math.floor(Math.random() * 10000000);
        var ref = firebase.database().ref('members/' + email0);
        var email1 = $('.add-member-name').val(),
            email2 = $('.add-member-work').val(),
            email3 = $('.add-member-facebook').val(),
            email4 = $('.add-member-twitter').val(),
            email5 = $('.add-member-linkedin').val(),
            email6 = $('.add-member-details').val(),
            email7 = $('.add-member-picture').get(0).files[0];
        if (email1 != '' && email2 != '' && email3 != '' && email4 != '' && email5 != '' && email6 != '' && email7 != undefined) {
            ref.set({
                memberName: email1,
                memberWork: email2,
                memberFacebook: email3,
                memberTwitter: email4,
                memberLinkedin: email5,
                memberDetails: email6,
                memberID: email0
            });
            var metadata = {
                contentType: email7.type
            };
            firebase.storage().ref('members/' + email0 + '/memberPic').put(email7, metadata).then(function() {
                firebase.storage().ref('members/' + email0 + '/memberPic').getDownloadURL().then(function(url) {
                    ref.update({
                        memberPic: url
                    })
                })
            });
            setTimeout(function() {
                ref.on('value', function(snapshot) {
                    var data = snapshot.val();
                    var email8 = data.memberPic;
                    if (email8) {
                        location.reload()
                    }
                })
            }, 3000)
        } else {
            alert('يجب إدخال جميع البيانات أولا');
            $('.add-member-btn').html('إضافة \u0627\u0644عضو')
        }
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var getMembersData = firebase.database().ref('members/');
            getMembersData.once('value', function(snapshot) {
                var allData = Object.values(snapshot.val());
                for (var i = 0; i < allData.length; i++) {
                    var email1 = JSON.stringify(allData[i].memberName).substr(1).slice(0, -1);
                    var email2 = JSON.stringify(allData[i].memberWork).substr(1).slice(0, -1);
                    var email3 = JSON.stringify(allData[i].memberFacebook).substr(1).slice(0, -1);
                    var email4 = JSON.stringify(allData[i].memberTwitter).substr(1).slice(0, -1);
                    var email5 = JSON.stringify(allData[i].memberLinkedin).substr(1).slice(0, -1);
                    var email6 = JSON.stringify(allData[i].memberDetails).substr(1).slice(0, -1);
                    var id = JSON.stringify(allData[i].memberID);
                    var tr = '<tr><td class=\'show-member-name\'></td><td class=\'show-member-work\'></td><td><button class=\'edit-member\'>تعديل</button></td><td><button class=\'delete-member\'>\u062D\u0630\u0641</button></td><td class=\'hiddenDetails\'></td><td class=\'hiddenFace\'></td><td class=\'hiddenTwitter\'></td><td class=\'hiddenLinked\'></td></tr>';
                    $('.table-team').append(tr);
                    $('.table-team tr:last-child').attr('id', id);
                    $('.table-team tr:last-child .show-member-name').text(email1);
                    $('.table-team tr:last-child .show-member-work').text(email2);
                    $('.table-team tr:last-child .hiddenFace').text(email3);
                    $('.table-team tr:last-child .hiddenTwitter').text(email4);
                    $('.table-team tr:last-child .hiddenLinked').text(email5);
                    $('.table-team tr:last-child .hiddenDetails').text(email6)
                }
            });
            $('.table-team').on('click', '.delete-member', function() {
                var Id = $(this).parents('tr').attr('id');
                var ref = firebase.database().ref('members/' + Id);
                var data3 = confirm('\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0623\u0646\u0643 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644عضو \u061F');
                if (data3) {
                    ref.remove().catch(function(error) {
                        var message = error.message;
                        alert(message)
                    });
                    firebase.storage().ref('members/' + Id + '/memberPic').delete().catch(function(error) {
                        var message = error.message;
                        alert(message)
                    });
                    setTimeout(function() {
                        ref.on('value', function(snapshot) {
                            var data = snapshot.val();
                            if (!data) {
                                location.reload()
                            }
                        })
                    }, 1500)
                }
            });
            $('.table-team').on('click', '.edit-member', function() {
                $('.control-members-div').hide();
                $('.edit-members-div').show();
                var Id = $(this).parents('tr').attr('id');
                $('.members-edits-container').attr('id', Id);
                var courseName = $(this).parents('tr').children('.show-member-name').text();
                var emaila = $(this).parents('tr').children('.show-member-work').text();
                var emailb = $(this).parents('tr').children('.hiddenFace').text();
                var emailc = $(this).parents('tr').children('.hiddenTwitter').text();
                var emaild = $(this).parents('tr').children('.hiddenLinked').text();
                var hiddenDetails = $(this).parents('tr').children('.hiddenDetails').text();
                $('.member-name-edit').val(courseName);
                $('.member-work-edit').val(emaila);
                $('.member-facebook-edit').val(emailb);
                $('.member-twitter-edit').val(emailc);
                $('.member-linkedin-edit').val(emaild);
                $('.member-about-edit').val(hiddenDetails);
                $('.member-name-editBTN').click(function() {
                    var datac = $('.members-edits-container').attr('id');
                    var data = $('.member-name-edit').val();
                    var ref = firebase.database().ref('members/' + datac);
                    ref.update({
                        memberName: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.member-work-editBTN').click(function() {
                    var datac = $('.members-edits-container').attr('id');
                    var data = $('.member-work-edit').val();
                    var ref = firebase.database().ref('members/' + datac);
                    ref.update({
                        memberWork: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.member-facebook-editBTN').click(function() {
                    var datac = $('.members-edits-container').attr('id');
                    var data = $('.member-facebook-edit').val();
                    var ref = firebase.database().ref('members/' + datac);
                    ref.update({
                        memberFacebook: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.member-twitter-editBTN').click(function() {
                    var datac = $('.members-edits-container').attr('id');
                    var data = $('.member-twitter-edit').val();
                    var ref = firebase.database().ref('members/' + datac);
                    ref.update({
                        memberTwitter: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.member-linkedin-editBTN').click(function() {
                    var datac = $('.members-edits-container').attr('id');
                    var data = $('.member-linkedin-edit').val();
                    var ref = firebase.database().ref('members/' + datac);
                    ref.update({
                        memberLinkedin: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.member-about-editBTN').click(function() {
                    var datac = $('.members-edits-container').attr('id');
                    var data = $('.member-about-edit').val();
                    var ref = firebase.database().ref('members/' + datac);
                    ref.update({
                        memberDetails: data
                    }).then(function() {
                        location.reload()
                    })
                });
                $('.member-pic-editBTN').click(function() {
                    var datac = $('.members-edits-container').attr('id');
                    var ref = firebase.database().ref('members/' + datac);
                    var file = $('.member-pic-edit').get(0).files[0];
                    if (file != undefined) {
                        var metadata = {
                            contentType: file.type
                        };
                        firebase.storage().ref('members/' + datac + '/memberPic').put(file, metadata).then(function() {
                            firebase.storage().ref('members/' + datac + '/memberPic').getDownloadURL().then(function(url) {
                                ref.update({
                                    memberPic: url
                                }).then(function() {
                                    location.reload()
                                })
                            })
                        })
                    } else {
                        alert('يجب إرفاق صورة أولا')
                    }
                })
            })
        }
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var emaile = firebase.database().ref('requests/');
            emaile.once('value', function(snapshot) {
                var allData = Object.values(snapshot.val());
                for (var i = 0; i < allData.length; i++) {
                    let emailf = JSON.stringify(allData[i].check).substr(1).slice(0, -1);
                    let email1 = JSON.stringify(allData[i].name).substr(1).slice(0, -1);
                    let password0 = JSON.stringify(allData[i].email).substr(1).slice(0, -1);
                    let password1 = JSON.stringify(allData[i].address).substr(1).slice(0, -1);
                    let password2 = JSON.stringify(allData[i].phone).substr(1).slice(0, -1);
                    let password3 = JSON.stringify(allData[i].date).substr(1).slice(0, -1);
                    let password4 = JSON.stringify(allData[i].requestID);
                    if (emailf == 'course') {
                        var password5 = JSON.stringify(allData[i].selectedCouresID).substr(1).slice(0, -1);
                        firebase.database().ref('courses/' + password5).once('value', function(snapshot) {
                            var data = snapshot.val();
                            var courseName = data.courseName;
                            var tr = '<tr><td class=\'req-name\'></td><td class=\'req-address\'></td><td class=\'req-phone\'></td><td class=\'req-email\'></td><td class=\'req-courseORevent\'></td><td class=\'req-date\'></td><td><button class=\'delete-request\'>\u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628</button></td></tr>';
                            $('.table-requests-courses').append(tr);
                            $('.table-requests-courses tr:last-child').attr('id', password4);
                            $('.table-requests-courses tr:last-child .req-name').text(email1);
                            $('.table-requests-courses tr:last-child .req-address').text(password1);
                            $('.table-requests-courses tr:last-child .req-phone').text(password2);
                            $('.table-requests-courses tr:last-child .req-email').text(password0);
                            $('.table-requests-courses tr:last-child .req-courseORevent').text(courseName);
                            $('.table-requests-courses tr:last-child .req-date').text(password3)
                        })
                    } else {
                        if (emailf == 'event') {
                            var password6 = JSON.stringify(allData[i].selectedEventID).substr(1).slice(0, -1);
                            firebase.database().ref('events/' + password6).once('value', function(snapshot) {
                                var data = snapshot.val();
                                var datad = data.eventName;
                                var tr = '<tr><td class=\'req-name\'></td><td class=\'req-address\'></td><td class=\'req-phone\'></td><td class=\'req-email\'></td><td class=\'req-courseORevent\'></td><td class=\'req-date\'></td><td><button class=\'delete-request\'>\u062D\u0630\u0641 \u0627\u0644\u0637\u0644\u0628</button></td></tr>';
                                $('.table-requests-events').append(tr);
                                $('.table-requests-events tr:last-child').attr('id', password4);
                                $('.table-requests-events tr:last-child .req-name').text(email1);
                                $('.table-requests-events tr:last-child .req-address').text(password1);
                                $('.table-requests-events tr:last-child .req-phone').text(password2);
                                $('.table-requests-events tr:last-child .req-email').text(password0);
                                $('.table-requests-events tr:last-child .req-courseORevent').text(datad);
                                $('.table-requests-events tr:last-child .req-date').text(password3)
                            })
                        }
                    }
                };
                $('.table-requests-courses').on('click', '.delete-request', function() {
                    var Id = $(this).parents('tr').attr('id');
                    var ref = firebase.database().ref('requests/' + Id);
                    var data3 = confirm('\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0623\u0646\u0643 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628 \u061F');
                    if (data3) {
                        ref.remove().catch(function(error) {
                            var message = error.message;
                            alert(message)
                        });
                        setTimeout(function() {
                            ref.on('value', function(snapshot) {
                                var data = snapshot.val();
                                if (!data) {
                                    location.reload()
                                }
                            })
                        }, 1000)
                    }
                });
                $('.table-requests-events').on('click', '.delete-request', function() {
                    var Id = $(this).parents('tr').attr('id');
                    var ref = firebase.database().ref('requests/' + Id);
                    var data3 = confirm('\u0647\u0644 \u0623\u0646\u062A \u0645\u062A\u0623\u0643\u062F \u0623\u0646\u0643 \u062A\u0631\u064A\u062F \u062D\u0630\u0641 \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628 \u061F');
                    if (data3) {
                        ref.remove().catch(function(error) {
                            var message = error.message;
                            alert(message)
                        });
                        setTimeout(function() {
                            ref.on('value', function(snapshot) {
                                var data = snapshot.val();
                                if (!data) {
                                    location.reload()
                                }
                            })
                        }, 1000)
                    }
                })
            })
        }
    });
    $('.background-editBTN').click(function() {
        $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
        var file = $('.background-edit').get(0).files[0];
        if (file != undefined) {
            var metadata = {
                contentType: file.type
            };
            firebase.storage().ref('background/backgroundImage').put(file, metadata).then(function() {
                firebase.storage().ref('background/backgroundImage').getDownloadURL().then(function(url) {
                    firebase.database().ref('background/').set({
                        backgroundURL: url
                    }).then(setTimeout(function() {
                        if (url) {
                            location.reload()
                        }
                    }, 1000))
                })
            })
        } else {
            alert('يجب إرفاق صورة أولا');
            $(this).html('تعديل')
        }
    });
    $('.video-editBTN').click(function() {
        $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
        var password7 = $('.video-edit').val();
        if (password7 != '') {
            firebase.database().ref('InfoVideo/').set({
                VideoURL: password7
            }).then(setTimeout(function() {
                if (password7) {
                    location.reload()
                }
            }, 1000))
        } else {
            alert('لا يمكن ترك الخانة فارغة');
            $(this).html('تعديل')
        }
    });
    $('.sponsorOne-editBTN').click(function() {
        $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
        var file = $('.sponsorOne-edit').get(0).files[0];
        if (file != undefined) {
            var metadata = {
                contentType: file.type
            };
            firebase.storage().ref('sponsors/sponsorOne').put(file, metadata).then(function() {
                firebase.storage().ref('sponsors/sponsorOne').getDownloadURL().then(function(url) {
                    firebase.database().ref('sponsors/').update({
                        sponsorOneURL: url
                    }).then(setTimeout(function() {
                        if (url) {
                            location.reload()
                        }
                    }, 1000))
                })
            })
        } else {
            alert('يجب إرفاق صورة أولا');
            $(this).html('تعديل')
        }
    });
    $('.sponsorTwo-editBTN').click(function() {
        $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
        var file = $('.sponsorTwo-edit').get(0).files[0];
        if (file != undefined) {
            var metadata = {
                contentType: file.type
            };
            firebase.storage().ref('sponsors/sponsorTwo').put(file, metadata).then(function() {
                firebase.storage().ref('sponsors/sponsorTwo').getDownloadURL().then(function(url) {
                    firebase.database().ref('sponsors/').update({
                        sponsorTwoURL: url
                    }).then(setTimeout(function() {
                        if (url) {
                            location.reload()
                        }
                    }, 1000))
                })
            })
        } else {
            alert('يجب إرفاق صورة أولا');
            $(this).html('تعديل')
        }
    });
    $('.sponsorThree-editBTN').click(function() {
        $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
        var file = $('.sponsorThree-edit').get(0).files[0];
        if (file != undefined) {
            var metadata = {
                contentType: file.type
            };
            firebase.storage().ref('sponsors/sponsorThree').put(file, metadata).then(function() {
                firebase.storage().ref('sponsors/sponsorThree').getDownloadURL().then(function(url) {
                    firebase.database().ref('sponsors/').update({
                        sponsorThreeURL: url
                    }).then(setTimeout(function() {
                        if (url) {
                            location.reload()
                        }
                    }, 1000))
                })
            })
        } else {
            alert('يجب إرفاق صورة أولا');
            $(this).html('تعديل')
        }
    });
    $('.sponsorFour-editBTN').click(function() {
        $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
        var file = $('.sponsorFour-edit').get(0).files[0];
        if (file != undefined) {
            var metadata = {
                contentType: file.type
            };
            firebase.storage().ref('sponsors/sponsorFour').put(file, metadata).then(function() {
                firebase.storage().ref('sponsors/sponsorFour').getDownloadURL().then(function(url) {
                    firebase.database().ref('sponsors/').update({
                        sponsorFourURL: url
                    }).then(setTimeout(function() {
                        if (url) {
                            location.reload()
                        }
                    }, 1000))
                })
            })
        } else {
            alert('يجب إرفاق صورة أولا');
            $(this).html('تعديل')
        }
    });
    $('.stats-students-editBTN').click(function() {
        $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
        var password8 = $('.stats-students-edit').val();
        if (password8 != '') {
            firebase.database().ref('statstics/').update({
                studentsNumber: password8
            }).then(setTimeout(function() {
                if (password8) {
                    location.reload()
                }
            }, 1000))
        } else {
            alert('لا يمكن ترك الخانة فارغة');
            $(this).html('تعديل')
        }
    });
    $('.stats-courses-editBTN').click(function() {
        $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
        var password9 = $('.stats-courses-edit').val();
        if (password9 != '') {
            firebase.database().ref('statstics/').update({
                coursesNumber: password9
            }).then(setTimeout(function() {
                if (password9) {
                    location.reload()
                }
            }, 1000))
        } else {
            alert('لا يمكن ترك الخانة فارغة');
            $(this).html('تعديل')
        }
    });
    $('.stats-teachers-editBTN').click(function() {
        $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
        var passworda = $('.stats-teachers-edit').val();
        if (passworda != '') {
            firebase.database().ref('statstics/').update({
                teachersNumber: passworda
            }).then(setTimeout(function() {
                if (passworda) {
                    location.reload()
                }
            }, 1000))
        } else {
            alert('لا يمكن ترك الخانة فارغة');
            $(this).html('تعديل')
        }
    });
    $('.stats-achivements-editBTN').click(function() {
        $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
        var passwordb = $('.stats-achivements-edit').val();
        if (passwordb != '') {
            firebase.database().ref('statstics/').update({
                achivementsNumber: passwordb
            }).then(setTimeout(function() {
                if (passwordb) {
                    location.reload()
                }
            }, 1000))
        } else {
            alert('لا يمكن ترك الخانة فارغة');
            $(this).html('تعديل')
        }
    });
    $('.galleryPic-addBTN').click(function() {
        $(this).html('<i class="fas fa-spinner animation-spinner"></i>');
        var file = $('.galleryPic-add').get(0).files[0];
        if (file != undefined) {
            let IDs = 1;
            var ref = firebase.database().ref('gallery/');
            ref.once('value', function(snapshot) {
                var allData = Object.values(snapshot.val());
                for (var i = 0; i < allData.length; i++) {
                    var data0 = JSON.stringify(allData[allData.length - 1].photoID);
                    var data1 = Number(data0);
                    IDs = Number(data1 + 1)
                }
            }).then(function() {
                var metadata = {
                    contentType: file.type
                };
                firebase.storage().ref('gallery/' + IDs).put(file, metadata).then(function() {
                    firebase.storage().ref('gallery/' + IDs).getDownloadURL().then(function(url) {
                        firebase.database().ref('gallery/' + IDs).set({
                            URL: url,
                            photoID: IDs
                        }).then(setTimeout(function() {
                            if (url) {
                                location.reload()
                            }
                        }, 1000))
                    })
                })
            })
        } else {
            alert('يجب إرفاق صورة أولا');
            $(this).html('إضافة')
        }
    })
};
if (location.pathname == '/registration.html') {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var passwordd = firebase.database().ref('courses/');
            passwordd.once('value', function(snapshot) {
                var allData = Object.values(snapshot.val());
                for (var i = 0; i < allData.length; i++) {
                    var courseName = JSON.stringify(allData[i].courseName).substr(1).slice(0, -1);
                    var passworde = JSON.stringify(allData[i].courseID);
                    var passwordf = '<option></option>';
                    $('.select-courses').append(passwordf);
                    $('.select-courses option:last-child').attr('id', passworde);
                    $('.select-courses option:last-child').text(courseName)
                }
            })
        }
    });
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var _0x7daex80 = firebase.database().ref('events/');
            _0x7daex80.once('value', function(snapshot) {
                var allData = Object.values(snapshot.val());
                for (var i = 0; i < allData.length; i++) {
                    var datad = JSON.stringify(allData[i].eventName).substr(1).slice(0, -1);
                    var _0x7daex81 = JSON.stringify(allData[i].eventID);
                    var passwordf = '<option></option>';
                    $('.select-events').append(passwordf);
                    $('.select-events option:last-child').attr('id', _0x7daex81);
                    $('.select-events option:last-child').text(datad)
                }
            })
        }
    });
    $('.send-course-request').click(function() {
        var select = $('.select-courses').val();
        if (select == '') {
            alert('يرجى إختيار الكورس أولاً')
        } else {
            var user = firebase.auth().currentUser;
            var _0x7daex83 = $('.select-courses option:selected').attr('id');
            var Id = Math.floor(Math.random() * 1000000000);
            var ref = firebase.database().ref('users/' + user.uid);
            ref.once('value', function(snapshot) {
                var data = snapshot.val();
                var name = data.displayName;
                var emailAddress = data.emailAddress;
                var _0x7daex85 = data.phoneNumber;
                var address = data.address;
                var dateNow = new Date().toLocaleDateString();
                var ref = firebase.database().ref('requests/' + Id);
                ref.set({
                    name: name,
                    email: emailAddress,
                    phone: _0x7daex85,
                    address: address,
                    requestID: Id,
                    check: 'course',
                    date: dateNow,
                    selectedCouresID: _0x7daex83
                }).then(function() {
                    $('.events-request-div').hide();
                    $('.courses-request-div').hide();
                    $('.successful-join').show()
                })
            })
        }
    });
    $('.send-event-request').click(function() {
        var select = $('.select-events').val();
        if (select == '') {
            alert('يرجى إختيار الايفينت أولاً');
        } else {
            var user = firebase.auth().currentUser;
            var _0x7daex86 = $('.select-events option:selected').attr('id');
            var Id = Math.floor(Math.random() * 1000000000);
            var ref = firebase.database().ref('users/' + user.uid);
            ref.once('value', function(snapshot) {
                var data = snapshot.val();
                var name = data.displayName;
                var emailAddress = data.emailAddress;
                var phoneNumber = data.phoneNumber;
                var address = data.address;
                var dateNow = new Date().toLocaleDateString();
                var ref = firebase.database().ref('requests/' + Id);
                ref.set({
                    name: name,
                    email: emailAddress,
                    phone: phoneNumber,
                    address: address,
                    requestID: Id,
                    check: 'event',
                    date: dateNow,
                    selectedEventID: _0x7daex86
                }).then(function() {
                    $('.events-request-div').hide();
                    $('.courses-request-div').hide();
                    $('.successful-join').show()
                })
            })
        }
    })
};
if (location.pathname == '/team.html') {
    var getMembersData = firebase.database().ref('members/');
    getMembersData.once('value', function(snapshot) {
        var allData = Object.values(snapshot.val());
        for (var i = 0; i < allData.length; i++) {
            var email1 = JSON.stringify(allData[i].memberName).substr(1).slice(0, -1);
            var email2 = JSON.stringify(allData[i].memberWork).substr(1).slice(0, -1);
            var email3 = JSON.stringify(allData[i].memberFacebook).substr(1).slice(0, -1);
            var email4 = JSON.stringify(allData[i].memberTwitter).substr(1).slice(0, -1);
            var email5 = JSON.stringify(allData[i].memberLinkedin).substr(1).slice(0, -1);
            var email6 = JSON.stringify(allData[i].memberDetails).substr(1).slice(0, -1);
            var _0x7daex87 = JSON.stringify(allData[i].memberPic).substr(1).slice(0, -1);
            var _0x7daex88 = '<div class="col-lg-4 col-md-6 col-12 mainDiv"><div class="member"><img src="images/person.png" class="TeamMemberImg"><div class="long-info"><h4 class="TeamMemberName"></h4><p class="TeamMemberInfo"></p><hr><div class="icons"><a href="#" target="_blank" class="TeamMemberFacebook"><i class="fab fa-facebook-square"></i></a><a href="#" target="_blank" class="TeamMemberTwitter"><i class="fab fa-twitter"></i></a><a href="#" target="_blank" class="TeamMemberLinked"><i class="fab fa-linkedin-in"></i></a></div></div><div class="short-info"><h4 class="TeamMemberName"></h4><p class="TeamMemberWork"></p></div></div></div>';
            $('.ReciveMembers').append(_0x7daex88);
            $('.ReciveMembers .mainDiv:last-of-type .member .TeamMemberImg').attr('src', _0x7daex87);
            $('.ReciveMembers .mainDiv:last-of-type .member .TeamMemberName').text(email1);
            $('.ReciveMembers .mainDiv:last-of-type .member .TeamMemberWork').text(email2);
            $('.ReciveMembers .mainDiv:last-of-type .member .TeamMemberInfo').text(email6);
            $('.ReciveMembers .mainDiv:last-of-type .member .TeamMemberFacebook').attr('href', email3);
            $('.ReciveMembers .mainDiv:last-of-type .member .TeamMemberTwitter').attr('href', email4);
            $('.ReciveMembers .mainDiv:last-of-type .member .TeamMemberLinked').attr('href', email5)
        }
    })
};
if (location.pathname == '/index.html' || location.pathname == '/' || location.pathname == '/about.html') {
    var getMembersData = firebase.database().ref('members/');
    getMembersData.once('value', function(snapshot) {
        var allData = Object.values(snapshot.val());
        for (var i = 0; i < 3; i++) {
            var email1 = JSON.stringify(allData[i].memberName).substr(1).slice(0, -1);
            var email2 = JSON.stringify(allData[i].memberWork).substr(1).slice(0, -1);
            var email3 = JSON.stringify(allData[i].memberFacebook).substr(1).slice(0, -1);
            var email4 = JSON.stringify(allData[i].memberTwitter).substr(1).slice(0, -1);
            var email5 = JSON.stringify(allData[i].memberLinkedin).substr(1).slice(0, -1);
            var email6 = JSON.stringify(allData[i].memberDetails).substr(1).slice(0, -1);
            var _0x7daex87 = JSON.stringify(allData[i].memberPic).substr(1).slice(0, -1);
            var _0x7daex88 = '<div class="col-lg-4 col-md-6 col-12 mainDiv"><div class="member"><img src="images/person.png" class="TeamMemberImg"><div class="long-info"><h4 class="TeamMemberName"></h4><p class="TeamMemberInfo"></p><hr><div class="icons"><a href="#" target="_blank" class="TeamMemberFacebook"><i class="fab fa-facebook-square"></i></a><a href="#" target="_blank" class="TeamMemberTwitter"><i class="fab fa-twitter"></i></a><a href="#" target="_blank" class="TeamMemberLinked"><i class="fab fa-linkedin-in"></i></a></div></div><div class="short-info"><h4 class="TeamMemberName"></h4><p class="TeamMemberWork"></p></div></div></div>';
            $('.ReciveMembers').append(_0x7daex88);
            $('.ReciveMembers .mainDiv:last-of-type .member .TeamMemberImg').attr('src', _0x7daex87);
            $('.ReciveMembers .mainDiv:last-of-type .member .TeamMemberName').text(email1);
            $('.ReciveMembers .mainDiv:last-of-type .member .TeamMemberWork').text(email2);
            $('.ReciveMembers .mainDiv:last-of-type .member .TeamMemberInfo').text(email6);
            $('.ReciveMembers .mainDiv:last-of-type .member .TeamMemberFacebook').attr('href', email3);
            $('.ReciveMembers .mainDiv:last-of-type .member .TeamMemberTwitter').attr('href', email4);
            $('.ReciveMembers .mainDiv:last-of-type .member .TeamMemberLinked').attr('href', email5)
        }
    })
};
if (location.pathname == '/courses.html') {
    var getCoursessData = firebase.database().ref('courses/').orderByKey();
    getCoursessData.once('value', function(snapshot) {
        var allData = Object.values(snapshot.val());
        for (var i = 0; i < allData.length; i++) {
            var courseName = JSON.stringify(allData[i].courseName).substr(1).slice(0, -1);
            var courseDetails = JSON.stringify(allData[i].courseDetails).substr(1).slice(0, -1);
            var courseDuration = JSON.stringify(allData[i].courseDuration).substr(1).slice(0, -1);
            var coursePrice = JSON.stringify(allData[i].coursePrice).substr(1).slice(0, -1);
            var courseTeacher = JSON.stringify(allData[i].courseTeacher).substr(1).slice(0, -1);
            var courseStudents = JSON.stringify(allData[i].courseStudents).substr(1).slice(0, -1);
            var _0x7daex8a = JSON.stringify(allData[i].coursePic).substr(1).slice(0, -1);
            var _0x7daex8b = JSON.stringify(allData[i].courseTeacherPic).substr(1).slice(0, -1);
            var _0x7daex8c = '<div class="col-lg-4 col-md-6 col-12 mainDiv"><div class="course"><img src="images/translations.png" class="course-img"><h3 class="course-price">السعر : 400\u062C</h3><div><img src="images/person2.jpg" class="teacher-img"><span class="teacher-name">\u0645\u0635\u0637\u0641\u064A \u0646\u0627\u0635\u0631 \u062A\u0648\u0641\u064A\u0642</span><hr><h4 class="course-name">\u0643\u0648\u0631\u0633 \u0627\u0644\u062A\u0631\u062C\u0645\u0629</h4><p class="course-details"></p><hr><i class="far fa-user"></i> <span class="num">40 \u0634\u062E\u0635</span><i class="far fa-clock"></i> <span class="time">\u0634\u0647\u0631\u064A\u0646</span><button onclick="location.href = \'registration.html\'">\u0623\u0644\u062A\u062D\u0642 \u0628\u0627\u0644\u0643\u0648\u0631\u0633</button></div></div></div>';
            $('.ReciveCourses').prepend(_0x7daex8c);
            $('.ReciveCourses .mainDiv:first-of-type .course .course-img').attr('src', _0x7daex8a);
            $('.ReciveCourses .mainDiv:first-of-type .course .teacher-img').attr('src', _0x7daex8b);
            $('.ReciveCourses .mainDiv:first-of-type .course .course-price').text('السعر ' + coursePrice + '\u062C');
            $('.ReciveCourses .mainDiv:first-of-type .course .teacher-name').text(courseTeacher);
            $('.ReciveCourses .mainDiv:first-of-type .course .course-name').text(courseName);
            $('.ReciveCourses .mainDiv:first-of-type .course .course-details').text(courseDetails);
            $('.ReciveCourses .mainDiv:first-of-type .course .time').text(courseDuration);
            $('.ReciveCourses .mainDiv:first-of-type .course .num').text(courseStudents + ' \u0637\u0627\u0644\u0628')
        };
        setTimeout(function() {
            $('.ReciveCourses .mainDiv:last-of-type').hide()
        }, 1800)
    })
};
if (location.pathname == '/index.html' || location.pathname == '/') {
    var getCoursessData = firebase.database().ref('courses/').orderByKey().limitToLast(3);
    getCoursessData.once('value', function(snapshot) {
        var allData = Object.values(snapshot.val());
        for (var i = 0; i < 3; i++) {
            var courseName = JSON.stringify(allData[i].courseName).substr(1).slice(0, -1);
            var courseDetails = JSON.stringify(allData[i].courseDetails).substr(1).slice(0, -1);
            var courseDuration = JSON.stringify(allData[i].courseDuration).substr(1).slice(0, -1);
            var coursePrice = JSON.stringify(allData[i].coursePrice).substr(1).slice(0, -1);
            var courseTeacher = JSON.stringify(allData[i].courseTeacher).substr(1).slice(0, -1);
            var courseStudents = JSON.stringify(allData[i].courseStudents).substr(1).slice(0, -1);
            var _0x7daex8a = JSON.stringify(allData[i].coursePic).substr(1).slice(0, -1);
            var _0x7daex8b = JSON.stringify(allData[i].courseTeacherPic).substr(1).slice(0, -1);
            var _0x7daex8c = '<div class="col-lg-4 col-md-6 col-12 mainDiv"><div class="course"><img src="images/translations.png" class="course-img"><h3 class="course-price">السعر : 400\u062C</h3><div><img src="images/person2.jpg" class="teacher-img"><span class="teacher-name">\u0645\u0635\u0637\u0641\u064A \u0646\u0627\u0635\u0631 \u062A\u0648\u0641\u064A\u0642</span><hr><h4 class="course-name">\u0643\u0648\u0631\u0633 \u0627\u0644\u062A\u0631\u062C\u0645\u0629</h4><p class="course-details">\u0643\u0648\u0631\u0633 \u0627\u0644\u0628\u0631\u0645\u062C\u0629 \u0648\u0643\u064A \u0645\u0635\u0631 </p><hr><i class="far fa-user"></i> <span class="num">40 \u0634\u062E\u0635</span><i class="far fa-clock"></i> <span class="time">\u0634\u0647\u0631\u064A\u0646</span><button onclick="location.href = \'registration.html\'">\u0623\u0644\u062A\u062D\u0642 \u0628\u0627\u0644\u0643\u0648\u0631\u0633</button></div></div></div>';
            $('.ReciveCourses').prepend(_0x7daex8c);
            $('.ReciveCourses .mainDiv:first-of-type .course .course-img').attr('src', _0x7daex8a);
            $('.ReciveCourses .mainDiv:first-of-type .course .teacher-img').attr('src', _0x7daex8b);
            $('.ReciveCourses .mainDiv:first-of-type .course .course-price').text('السعر ' + coursePrice + '\u062C');
            $('.ReciveCourses .mainDiv:first-of-type .course .teacher-name').text(courseTeacher);
            $('.ReciveCourses .mainDiv:first-of-type .course .course-name').text(courseName);
            $('.ReciveCourses .mainDiv:first-of-type .course .course-details').text(courseDetails);
            $('.ReciveCourses .mainDiv:first-of-type .course .time').text(courseDuration);
            $('.ReciveCourses .mainDiv:first-of-type .course .num').text(courseStudents + ' \u0637\u0627\u0644\u0628')
        }
    })
};
if (location.pathname == '/events.html') {
    var getEventsData = firebase.database().ref('events/').orderByKey();
    getEventsData.once('value', function(snapshot) {
        var allData = Object.values(snapshot.val());
        for (var i = 0; i < allData.length; i++) {
            var datad = JSON.stringify(allData[i].eventName).substr(1).slice(0, -1);
            var _0x7daex51 = JSON.stringify(allData[i].eventDetails).substr(1).slice(0, -1);
            var _0x7daex50 = JSON.stringify(allData[i].eventDate).substr(1).slice(0, -1);
            var _0x7daex52 = JSON.stringify(allData[i].eventTime).substr(1).slice(0, -1);
            var dataf = JSON.stringify(allData[i].eventPlace).substr(1).slice(0, -1);
            var _0x7daex8d = JSON.stringify(allData[i].eventPic).substr(1).slice(0, -1);
            var password6 = JSON.stringify(allData[i].eventID);
            String.prototype.replaceAll = function(replaced, replacement) {
                if (replaced === replacement) {
                    return this
                };
                var self = this;
                var final = self.indexOf(replaced);
                while (final != -1) {
                    self = self.replace(replaced, replacement);
                    final = self.indexOf(replaced)
                };
                return self
            };
            var _0x7daex92 = _0x7daex51.replaceAll('\n', ' ');
            var _0x7daex93 = '<div class="row event"><div class="col-lg-6 col-12 p-0"><div class="event-image"><img src="images/event1.jpg" class="event-img"></div></div><div class="col-lg-6 col-12"><div class="event-details"><h3 class="event-name">\u0625\u064A\u0641\u064A\u0646\u062A \u0627\u0644\u0645\u0635\u0628\u0627\u062D \u0627\u0644\u0633\u062D\u0631\u064A</h3><i class="far fa-calendar-alt"></i><span class="event-date">24 \u0646\u0648\u0641\u0645\u064A\u0631 2019</span><i class="far fa-clock"></i><span class="event-time">5:00 PM</span><span class="last"><i class="far fa-map"></i><span class="event-address">\u0633\u0648\u0647\u0627\u062C \u0634 \u0633\u0648\u0647\u0627\u062C</span></span><hr><p class="event-details-p"></p><button class="event-more-btn">\u0623\u0642\u0631\u0623 \u0627\u0644\u0645\u0632\u064A\u062F</button></div></div></div>';
            $('.ReciveEvents').prepend(_0x7daex93);
            $('.ReciveEvents .event:first-of-type .event-img').attr('src', _0x7daex8d);
            $('.ReciveEvents .event:first-of-type .event-name').text(datad);
            $('.ReciveEvents .event:first-of-type .event-date').text(_0x7daex50);
            $('.ReciveEvents .event:first-of-type .event-time').text(_0x7daex52);
            $('.ReciveEvents .event:first-of-type .event-address').text(dataf);
            $('.ReciveEvents .event:first-of-type .event-details-p').html(_0x7daex92);
            $('.ReciveEvents .event:first-of-type .event-more-btn').attr('id', password6)
        };
        setTimeout(function() {
            $('.ReciveEvents .event:last-of-type').hide()
        }, 1800)
    })
};
if (location.pathname == '/index.html' || location.pathname == '/') {
    var getEventsData = firebase.database().ref('events/').orderByKey().limitToLast(2);
    getEventsData.once('value', function(snapshot) {
        var allData = Object.values(snapshot.val());
        for (var i = 0; i < 2; i++) {
            var datad = JSON.stringify(allData[i].eventName).substr(1).slice(0, -1);
            var _0x7daex51 = JSON.stringify(allData[i].eventDetails).substr(1).slice(0, -1);
            var _0x7daex50 = JSON.stringify(allData[i].eventDate).substr(1).slice(0, -1);
            var _0x7daex52 = JSON.stringify(allData[i].eventTime).substr(1).slice(0, -1);
            var dataf = JSON.stringify(allData[i].eventPlace).substr(1).slice(0, -1);
            var _0x7daex8d = JSON.stringify(allData[i].eventPic).substr(1).slice(0, -1);
            var password6 = JSON.stringify(allData[i].eventID);
            String.prototype.replaceAll = function(replaced, replacement) {
                if (replaced === replacement) {
                    return this
                };
                var self = this;
                var final = self.indexOf(replaced);
                while (final != -1) {
                    self = self.replace(replaced, replacement);
                    final = self.indexOf(replaced)
                };
                return self
            };
            var _0x7daex92 = _0x7daex51.replaceAll('\n', ' ');
            var _0x7daex93 = '<div class="row event"><div class="col-lg-6 col-12 p-0"><div class="event-image"><img src="images/event1.jpg" class="event-img"></div></div><div class="col-lg-6 col-12"><div class="event-details"><h3 class="event-name">\u0625\u064A\u0641\u064A\u0646\u062A \u0627\u0644\u0645\u0635\u0628\u0627\u062D \u0627\u0644\u0633\u062D\u0631\u064A</h3><i class="far fa-calendar-alt"></i><span class="event-date">24 \u0646\u0648\u0641\u0645\u064A\u0631 2019</span><i class="far fa-clock"></i><span class="event-time">5:00 PM</span><span class="last"><i class="far fa-map"></i><span class="event-address">\u0633\u0648\u0647\u0627\u062C \u0634 \u0633\u0648\u0647\u0627\u062C</span></span><hr><p class="event-details-p"></p><button class="event-more-btn">\u0623\u0642\u0631\u0623 \u0627\u0644\u0645\u0632\u064A\u062F</button></div></div></div>';
            $('.ReciveEvents').prepend(_0x7daex93);
            $('.ReciveEvents .event:first-of-type .event-img').attr('src', _0x7daex8d);
            $('.ReciveEvents .event:first-of-type .event-name').text(datad);
            $('.ReciveEvents .event:first-of-type .event-date').text(_0x7daex50);
            $('.ReciveEvents .event:first-of-type .event-time').text(_0x7daex52);
            $('.ReciveEvents .event:first-of-type .event-address').text(dataf);
            $('.ReciveEvents .event:first-of-type .event-details-p').html(_0x7daex92);
            $('.ReciveEvents .event:first-of-type .event-more-btn').attr('id', password6)
        }
    })
};
if (location.pathname == '/news.html') {
    var getNewsData = firebase.database().ref('news/').orderByKey();
    getNewsData.once('value', function(snapshot) {
        var allData = Object.values(snapshot.val());
        for (var i = 0; i < allData.length; i++) {
            var _0x7daex59 = JSON.stringify(allData[i].newsName).substr(1).slice(0, -1);
            var _0x7daex5a = JSON.stringify(allData[i].newsDetails).substr(1).slice(0, -1);
            var _0x7daex95 = JSON.stringify(allData[i].newsDate).substr(1).slice(0, -1);
            var _0x7daex5f = JSON.stringify(allData[i].newsPublisher).substr(1).slice(0, -1);
            var _0x7daex96 = JSON.stringify(allData[i].newsPic).substr(1).slice(0, -1);
            var _0x7daex97 = JSON.stringify(allData[i].newsID);
            String.prototype.replaceAll = function(replaced, replacement) {
                if (replaced === replacement) {
                    return this
                };
                var self = this;
                var final = self.indexOf(replaced);
                while (final != -1) {
                    self = self.replace(replaced, replacement);
                    final = self.indexOf(replaced)
                };
                return self
            };
            var _0x7daex98 = _0x7daex5a.replaceAll('\n', ' ');
            var _0x7daex99 = '<div class="col-md-11 col-12 news-one"><div class="news-single"><img src="images/news1.jpg" class="news-img"><div><i class="far fa-calendar-alt"></i><span class=\'news-date\'>24 \u0646\u0648\u0641\u0645\u0628\u0631 2019</span><hr><h4 class="news-name">\u062C\u0627\u0626\u0632\u0629 \u0623\u0641\u0636\u0644 \u0645\u0628\u0631\u0645\u062C \u0645\u0646 \u0633\u0648\u0628\u0631 \u0625\u064A\u0641\u064A\u0646\u062A\u0627\u0648\u064A</h4><p class="news-details-p"></p><a class=\'news-more\'>\u0623\u0642\u0631\u0623 \u0627\u0644\u0645\u0632\u064A\u062F</a><hr><i class="far fa-user"></i> <span class="news-publisher">\u0623\u062D\u0645\u062F \u0623\u064A\u0645\u0646</span></div></div></div>';
            $('.ReciveNews').prepend(_0x7daex99);
            $('.ReciveNews .news-one:first-of-type .news-img').attr('src', _0x7daex96);
            $('.ReciveNews .news-one:first-of-type .news-name').text(_0x7daex59);
            $('.ReciveNews .news-one:first-of-type .news-date').text(_0x7daex95);
            $('.ReciveNews .news-one:first-of-type .news-details-p').html(_0x7daex98);
            $('.ReciveNews .news-one:first-of-type .news-publisher').text(_0x7daex5f);
            $('.ReciveNews .news-one:first-of-type .news-more').attr('href', 'news-details.html?id=' + _0x7daex97)
        };
        setTimeout(function() {
            $('.ReciveNews .news-one:last-of-type').hide()
        }, 1800)
    })
};
if (location.pathname == '/index.html' || location.pathname == '/') {
    var getNewsData = firebase.database().ref('news/').orderByKey().limitToLast(3);
    getNewsData.once('value', function(snapshot) {
        var allData = Object.values(snapshot.val());
        for (var i = 0; i < 3; i++) {
            var _0x7daex59 = JSON.stringify(allData[i].newsName).substr(1).slice(0, -1);
            var _0x7daex5a = JSON.stringify(allData[i].newsDetails).substr(1).slice(0, -1);
            var _0x7daex95 = JSON.stringify(allData[i].newsDate).substr(1).slice(0, -1);
            var _0x7daex5f = JSON.stringify(allData[i].newsPublisher).substr(1).slice(0, -1);
            var _0x7daex96 = JSON.stringify(allData[i].newsPic).substr(1).slice(0, -1);
            var _0x7daex97 = JSON.stringify(allData[i].newsID);
            String.prototype.replaceAll = function(replaced, replacement) {
                if (replaced === replacement) {
                    return this
                };
                var self = this;
                var final = self.indexOf(replaced);
                while (final != -1) {
                    self = self.replace(replaced, replacement);
                    final = self.indexOf(replaced)
                };
                return self
            };
            var _0x7daex98 = _0x7daex5a.replaceAll('\n', ' ');
            var _0x7daex99 = '<div class="col-lg-4 col-12 news-one"><div class="news-single"><img src="images/news3.jpg" class="news-img"><div><i class="far fa-calendar-alt"></i><span class=\'news-date\'>24 \u0646\u0648\u0641\u0645\u0628\u0631 2019</span><hr><h4 class="news-name">\u0641\u062A\u062D \u0628\u0627\u0628 \u0627\u0644\u062A\u0642\u062F\u064A\u0645 \u0644\u0644\u0645\u0635\u0628\u0627\u062D \u0627\u0644\u0633\u062D\u0631\u064A</h4><p class="news-details-p"></p><a class=\'news-more\'>\u0623\u0642\u0631\u0623 \u0627\u0644\u0645\u0632\u064A\u062F</a><hr><i class="far fa-user"></i> <span class="news-publisher">\u062D\u0633\u0646 \u0639\u0644\u064A</span></div></div></div>';
            $('.ReciveNews').prepend(_0x7daex99);
            $('.ReciveNews .news-one:first-of-type .news-img').attr('src', _0x7daex96);
            $('.ReciveNews .news-one:first-of-type .news-name').text(_0x7daex59);
            $('.ReciveNews .news-one:first-of-type .news-date').text(_0x7daex95);
            $('.ReciveNews .news-one:first-of-type .news-details-p').html(_0x7daex98);
            $('.ReciveNews .news-one:first-of-type .news-publisher').text(_0x7daex5f);
            $('.ReciveNews .news-one:first-of-type .news-more').attr('href', 'news-details.html?id=' + _0x7daex97)
        }
    })
};
if (location.pathname == '/gallery.html') {
    var getImagesData = firebase.database().ref('gallery/').orderByKey();
    getImagesData.once('value', function(snapshot) {
        var allData = Object.values(snapshot.val());
        for (var i = 0; i < allData.length; i++) {
            var Url = JSON.stringify(allData[i].URL).substr(1).slice(0, -1);
            var photoID = JSON.stringify(allData[i].photoID);
            var img = '<div class="col-md-4 col-12 image-div"><div class="image"><i class="far fa-trash-alt delete-photo" title="Delete This photo"></i><img src="images/gal9.jpg"></div></div>';
            $('.ReciveImages').prepend(img);
            $('.ReciveImages .image-div:first-of-type .image img').attr('src', Url);
            $('.ReciveImages .image-div:first-of-type .image .delete-photo').attr('id', photoID)
        };
        setTimeout(function() {
            $('.ReciveImages .image-div:last-of-type').hide()
        }, 1800)
    });
    $('.ReciveImages').on('click', '.delete-photo', function() {
        var id = $(this).attr('id');
        var ref = firebase.database().ref('gallery/' + id);
        var data3 = confirm('هل أنت متأكد أنك تريد حذف هذه الصورة ؟');
        if (data3) {
            ref.remove().catch(function(error) {
                var message = error.message;
                alert(message)
            });
            firebase.storage().ref('gallery/' + id).delete().catch(function(error) {
                var message = error.message;
                alert(message)
            });
            setTimeout(function() {
                ref.on('value', function(snapshot) {
                    var data = snapshot.val();
                    if (!data) {
                        location.reload()
                    }
                })
            }, 1500)
        }
    });
};

if (location.pathname == '/about.html') {
    var getImagesData = firebase.database().ref('gallery/').orderByKey().limitToLast(6);
    getImagesData.once('value', function(snapshot) {
        var allData = Object.values(snapshot.val());
        for (var i = 0; i < 6; i++) {
            var Url = JSON.stringify(allData[i].URL).substr(1).slice(0, -1);
            var photoID = JSON.stringify(allData[i].photoID);
            var img = '<div class="col-md-4 col-12 image-div"><div class="image"><i class="far fa-trash-alt delete-photo" title="Delete This photo"></i><img src="images/gal9.jpg"></div></div>';
            $('.ReciveImages').prepend(img);
            $('.ReciveImages .image-div:first-of-type .image img').attr('src', Url);
            $('.ReciveImages .image-div:first-of-type .image .delete-photo').attr('id', photoID)
        }
    });
    $('.ReciveImages').on('click', '.delete-photo', function() {
        var id = $(this).attr('id');
        var ref = firebase.database().ref('gallery/' + id);
        var data3 = confirm('هل أنت متأكد أنك تريد حذف هذه الصورة ؟');
        if (data3) {
            ref.remove().catch(function(error) {
                var message = error.message;
                alert(message)
            });
            firebase.storage().ref('gallery/' + id).delete().catch(function(error) {
                var message = error.message;
                alert(message)
            });
            setTimeout(function() {
                ref.on('value', function(snapshot) {
                    var data = snapshot.val();
                    if (!data) {
                        location.reload()
                    }
                })
            }, 1500)
        }
    });
};

if (location.pathname == '/index.html' || location.pathname == '/' || location.pathname == '/about.html') {
    var getVideo = firebase.database().ref('InfoVideo/');
    getVideo.once('value', function(snapshot) {
        var data = snapshot.val();
        var _0x7daex9f = data.VideoURL;
        $('.infoVideo').attr('src', _0x7daex9f)
    })
};

if (location.pathname == '/index.html' || location.pathname == '/') {
    var getSponsors = firebase.database().ref('sponsors/');
    getSponsors.once('value', function(snapshot) {
        var data = snapshot.val();
        var _0x7daexa1 = data.sponsorOneURL;
        var _0x7daexa2 = data.sponsorTwoURL;
        var _0x7daexa3 = data.sponsorThreeURL;
        var _0x7daexa4 = data.sponsorFourURL;
        $('.sponsorOne').attr('src', _0x7daexa1);
        $('.sponsorTwo').attr('src', _0x7daexa2);
        $('.sponsorThree').attr('src', _0x7daexa3);
        $('.sponsorFour').attr('src', _0x7daexa4)
    })
};
if (location.pathname == '/index.html' || location.pathname == '/') {
    var getStatstics = firebase.database().ref('statstics/');
    getStatstics.once('value', function(snapshot) {
        var data = snapshot.val();
        var _0x7daexa6 = data.studentsNumber;
        var _0x7daexa7 = data.coursesNumber;
        var _0x7daexa8 = data.teachersNumber;
        var _0x7daexa9 = data.achivementsNumber;
        $('.nums-students').text(_0x7daexa6);
        $('.nums-courses').text(_0x7daexa7);
        $('.nums-teachers').text(_0x7daexa8);
        $('.nums-achivements').text(_0x7daexa9)
    })
};
if (location.pathname == '/index.html' || location.pathname == '/' || location.pathname == '/events.html') {
    $('.ReciveEvents').on('click', '.event-more-btn', function() {
        var _0x7daexaa = $(this).attr('id');
        location.href = 'event-details.html?id=' + _0x7daexaa
    })
};
if (location.pathname == '/event-details.html') {
    if (location.search != '') {
        var ID = location.search.split('?')[1].split('&')[0].substr(3);
        var ref = firebase.database().ref('events/' + ID);
        ref.once('value', function(snapshot) {
            var data = snapshot.val();
            if (data != null) {
                var datad = data.eventName;
                var _0x7daex51 = data.eventDetails;
                var dataf = data.eventPlace;
                var _0x7daex50 = data.eventDate;
                var _0x7daex52 = data.eventTime;
                var _0x7daex8d = data.eventPic;
                String.prototype.replaceAll = function(replaced, replacement) {
                    if (replaced === replacement) {
                        return this
                    };
                    var self = this;
                    var final = self.indexOf(replaced);
                    while (final != -1) {
                        self = self.replace(replaced, replacement);
                        final = self.indexOf(replaced)
                    };
                    return self
                };
                var _0x7daex92 = _0x7daex51.replaceAll('\n', '<br>');
                $('.event-img').attr('src', _0x7daex8d);
                $('.event-name').text(datad);
                $('.event-date').text(_0x7daex50);
                $('.event-details-div').html(_0x7daex92);
                $('.event-time').text(_0x7daex52);
                $('.event-address').text(dataf);
                $('.page-title').text(datad);
                $('title').text(datad);
                if ($('img').attr('src') == null) {
                    $(this).hide()
                }
            } else {
                location.href = '404.html'
            }
        })
    } else {
        location.href = 'events.html'
    }
};
if (location.pathname == '/news-details.html') {
    if (location.search != '') {
        var ID = location.search.split('?')[1].split('&')[0].substr(3);
        var ref = firebase.database().ref('news/' + ID);
        ref.once('value', function(snapshot) {
            var data = snapshot.val();
            if (data != null) {
                var _0x7daex59 = data.newsName;
                var _0x7daex5a = data.newsDetails;
                var _0x7daex5f = data.newsPublisher;
                var _0x7daex95 = data.newsDate;
                var _0x7daex96 = data.newsPic;
                String.prototype.replaceAll = function(replaced, replacement) {
                    if (replaced === replacement) {
                        return this
                    };
                    var self = this;
                    var final = self.indexOf(replaced);
                    while (final != -1) {
                        self = self.replace(replaced, replacement);
                        final = self.indexOf(replaced)
                    };
                    return self
                };
                var _0x7daex98 = _0x7daex5a.replaceAll('\n', '<br>');
                $('.news-img').attr('src', _0x7daex96);
                $('.news-name').text(_0x7daex59);
                $('.news-details-div').html(_0x7daex98);
                $('.news-publisher').text(_0x7daex5f);
                $('.news-date').text(_0x7daex95);
                $('.page-title').text(_0x7daex59);
                $('title').text(_0x7daex59);
                if ($('img').attr('src') == null) {
                    $(this).hide()
                }
            } else {
                location.href = '404.html'
            }
        }).then(function() {
            var ref2 = firebase.database().ref('news/' + ID + '/comments/').orderByKey();
            ref2.once('value', function(snapshot) {
                var allData = Object.values(snapshot.val());
                if (allData.length > 1) {
                    $('.noComments').hide();
                    for (var i = 0; i < allData.length; i++) {
                        let _0x7daexab = JSON.stringify(allData[i].name).substr(1).slice(0, -1);
                        var _0x7daexac = JSON.stringify(allData[i].commentText).substr(1).slice(0, -1);
                        let _0x7daexad = JSON.stringify(allData[i].photo).substr(1).slice(0, -1);
                        let _0x7daexae = JSON.stringify(allData[i].date).substr(1).slice(0, -1);
                        let _0x7daexaf = JSON.stringify(allData[i].commentID);
                        var user = firebase.auth().currentUser;
                        String.prototype.replaceAll = function(replaced, replacement) {
                            if (replaced === replacement) {
                                return this
                            };
                            var self = this;
                            var final = self.indexOf(replaced);
                            while (final != -1) {
                                self = self.replace(replaced, replacement);
                                final = self.indexOf(replaced)
                            };
                            return self
                        };
                        let _0x7daexb0 = _0x7daexac.replaceAll('\n', '<br>');
                        var comment = '<div class="row justify-content-center comments"><i class="far fa-trash-alt delete-comment" title="Delete This Comment"></i><div class="col-lg-2 col-3 image"><img src="images/sara.jpg" class="photo" alt="image is not available"></div><div class="col-lg-10 col-8 comment"><h4 class="name"></h4><i class="far fa-clock"></i> <span class="date"></span><p class="comment-text"></p></div></div>';
                        if (user) {
                            var ref = firebase.database().ref('users/' + user.uid);
                            ref.once('value', function(snapshot) {
                                var data = snapshot.val();
                                var username = data.displayName;
                                $('.ReciveComments').prepend(comment);
                                $('.ReciveComments .comments:first-of-type').attr('id', _0x7daexaf);
                                $('.ReciveComments .comments:first-of-type .photo').attr('src', _0x7daexad);
                                $('.ReciveComments .comments:first-of-type .name').text(_0x7daexab);
                                $('.ReciveComments .comments:first-of-type .date').text(_0x7daexae);
                                $('.ReciveComments .comments:first-of-type .comment-text').html(_0x7daexb0);
                                if (_0x7daexab != username) {
                                    $('.ReciveComments .comments:first-of-type .delete-comment').hide()
                                }
                            })
                        } else {
                            $('.ReciveComments').prepend(comment);
                            $('.ReciveComments .comments:first-of-type').attr('id', _0x7daexaf);
                            $('.ReciveComments .comments:first-of-type .photo').attr('src', _0x7daexad);
                            $('.ReciveComments .comments:first-of-type .name').text(_0x7daexab);
                            $('.ReciveComments .comments:first-of-type .date').text(_0x7daexae);
                            $('.ReciveComments .comments:first-of-type .comment-text').html(_0x7daexb0);
                            $('.ReciveComments .comments:first-of-type .delete-comment').hide()
                        }
                    };
                    setTimeout(function() {
                        $('.ReciveComments .comments#0').hide()
                    }, 1800)
                }
            });
            $('.ReciveComments').on('click', '.delete-comment', function() {
                var ID = location.hash.substr(1);
                var Id = $(this).parents('.comments').attr('id');
                var ref = firebase.database().ref('news/' + ID + '/comments/' + Id);
                var data3 = confirm('هل أنت متأكد أنك تريد حذف هذا التعليق ؟');
                if (data3) {
                    ref.remove().catch(function(error) {
                        var message = error.message;
                        alert(message)
                    });
                    setTimeout(function() {
                        ref.on('value', function(snapshot) {
                            var data = snapshot.val();
                            if (!data) {
                                location.reload()
                            }
                        })
                    }, 1500)
                }
            })
        })
    } else {
        location.href = 'news.html'
    }
};
if (location.pathname == '/news-details.html') {
    $('.send-comment').click(function() {
        var user = firebase.auth().currentUser;
        if (user) {
            var ID = location.search.split('?')[1].split('&')[0].substr(3);
            var comment = $('.comment-text-area').val();
            let commentID = 1;
            var ref = firebase.database().ref('users/' + user.uid);
            if (comment != '') {
                ref.once('value', function(snapshot) {
                    var data = snapshot.val();
                    var name = data.displayName;
                    var photoURL = data.photoURL;
                    var dateNow = new Date().toLocaleString();
                    var ref = firebase.database().ref('news/' + ID + '/comments/');
                    ref.once('value', function(snapshot) {
                        var allData = Object.values(snapshot.val());
                        for (var i = 0; i < allData.length; i++) {
                            var IDD = JSON.stringify(allData[allData.length - 1].commentID);
                            var IDDD = Number(IDD);
                            commentID = Number(IDDD + 1)
                        }
                    }).then(function() {
                        var ref = firebase.database().ref('news/' + ID + '/comments/' + commentID);
                        ref.set({
                            name: name,
                            date: dateNow,
                            photo: photoURL,
                            commentText: comment,
                            commentID: commentID
                        }).then(function() {
                            location.reload()
                        })
                    })
                })
            } else {
                alert('لا يمكن إرسال تعليق فارغ');
            }
        } else {
            alert('يجب تسجيل الدخول أولا قبل التعليق على الخبر');
        }
    })
};

setTimeout(function() {
    console.clear()
}, 5000)
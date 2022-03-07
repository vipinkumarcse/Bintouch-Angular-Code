package com.b_in_touch.utils

import android.annotation.SuppressLint
import android.app.Activity
import android.content.ActivityNotFoundException
import android.content.Intent
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.net.Uri
import android.widget.Toast
import androidx.core.content.ContextCompat
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch


fun Activity.linkType(title: String, link: String) {

    when (title) {
        "twitter" -> {
            twitterIntent(link)
        }
        "facebook" -> {
            getFacebookIntent(link)
        }
        "spotify" -> {
            spotify(link)
        }
        "trustpilot" -> {
            trustPilot(link)
        }
        "youtube" -> {
            youTubeIntent(link)
        }
        "youtubeMusic" -> {
            youTubeIntent(link)
        }
        "devianArt" -> {
            devianArtIntent(link)
        }
        "doctorlib" -> {
            doctorIntent(link)
        }

        "chrome" -> {
            chrome(link)
        }
        "tinder" -> {
            tinder(link)
        }
//        "Pinterest" -> {
//
//        }
        "linkedin" -> {
            linkedInIntent(link)
        }
        "instagram" -> {
            instagramIntent(link)
        }
        "whatsApp" -> {
            openWhatsApp(link)
        }
        "apple-Pay" -> {
            openUrl(link)
        }
        "call" -> {
            call(link)
        }
        "phone" -> {
            call(link)
        }
        "pinterest" -> {
            pinterest(link)
        }
        "snapchat" -> {
            snapchat(link)
        }
        "skype" -> {
            skype(link)
        }
        "messanger" -> {
            facebookMessanger(link)
        }
        "tiktok" -> {
            openTikTokProfile(link)
        }
        "telegram" -> {
            telegramIntent(link)
        }
        "email" -> {
            gmail(link)
        }
        "signal" -> {
            signal(link)
        }
        "soundcloud" -> {
            soundCloud(link)
        }

        "paypal" -> {
            payPal(link)
        }
        "cash App" -> {
            cashApp(link)
        }
        "website" -> {
            openWebsite(link)
        }
        /* "Venmo" -> {
         venmo(link)
     }*/
        "maps" -> {
            mapDirection(link)
        }
        "googleMaps" -> {
            map(link)
        }
        "uber" -> {
            uber(link)
        }
        "location" -> {
            map(link)
        }
        "mappy" -> {
            mappy(link)
        }
        "text Message" -> {
            textMessage(link)
        }
        "haraj" -> {
            haraj(link)
        }
        "bayt" -> {
            bayt(link)
        }
        "imo" -> {
            imo(link)
        }
        "calendly" -> {
            calendly(link)
        }

        "tripAdvisor" -> {
            tripAdvisor(link)
        }
        "indeed" -> {
            indeed(link)
        }
        "waze" -> {
            waze(link)
        }
        "behance" -> {
            Behance(link)
        }
        "reddit" -> {
            reddit(link)
        }
        "tumblr" -> {
            tumblr(link)
        }
        "tumblr" -> {
            tumblr(link)
        }
        "paylibb" -> {
            paylibb(link)
        }
        "twitch" -> {
            Twitch(link)
        }
        "quora" -> {
            Quora(link)
        }
        "dribbble" -> {
            Dribbble(link)
        }
        "weibo" -> {
            Weibo(link)
        }
        "renren" -> {
            Renren(link)
        }
        "messenger" -> {
            Messenger(link)
        }
        "wechat" -> {
            Wechat(link)
        }
        "kik" -> {
            Kik(link)
        }
        "zoom" -> {
            Zoom(link)
        }
        "microsoftTeams" -> {
            MicrosoftTeams(link)
        }
        "googleMeet" -> {
            GoogleMeet(link)
        }
        "viber" -> {
            Viber(link)
        }
        "qq" -> {
            QQ(link)
        }
        "lydia" -> {
            Lydia(link)
        }
        "music" -> {
            AppleMusic(link)
        }
        "vimeo" -> {
            Vimeo(link)
        }
        "yelp" -> {
            Yelp(link)
        }
        "drive" -> {
            Drive(link)
        }
        else -> {
            openLink(link)
        }
    }
}


fun Activity.TikTok(username: String) {
    var link = "https://www.tiktok.com/@" + username
    try {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(link))
        intent.setPackage("com.tiktok")
        startActivity(intent)
    } catch (e: ActivityNotFoundException) {
        try {
            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(link)))
        } catch (e: Exception) {
//            showToast(this, this.resources.getString(R.string.valid_link))

        }
    }
}


fun Activity.tripAdvisor(link: String) {

        val profileUrls = "https://www.tripadvisor.in/$link"
        val profileUrl = "https://www.tripadvisor.in/$link"
        if (appInstalledOrNot("com.tripadvisor.tripadvisor")) {
            try {
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
                intent.setPackage(packageName)
                this.startActivity(intent)
            } catch (e: ActivityNotFoundException) {
                this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
            }
        } else {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }




//    try {
//        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(link))
//        intent.setPackage("com.tripadvisor.tripadvisor")
//        startActivity(intent)
//    } catch (e: ActivityNotFoundException) {
//        try {
//            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(link)))
//        } catch (e: Exception) {
////            showToast(this, this.resources.getString(R.string.valid_link))
//
//        }
//
//    }
}

fun Activity.waze(link: String) {
    try {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(link))
        intent.setPackage("com.waze")
        startActivity(intent)
    } catch (e: ActivityNotFoundException) {
        try {
            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(link)))
        } catch (e: Exception) {
//            showToast(this, this.resources.getString(R.string.valid_link))

        }

    }
}

fun Activity.indeed(link: String) {

    val profileUrls = "https://in.indeed.com/"
    val profileUrl = "https://in.indeed.com/"
    if (appInstalledOrNot("com.indeed.android.jobsearch")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }





//    try {
//        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(link))
//        intent.setPackage("com.indeed.android.jobsearch")
//        startActivity(intent)
//    } catch (e: ActivityNotFoundException) {
//        try {
//            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(link)))
//        } catch (e: Exception) {
////            showToast(this, this.resources.getString(R.string.valid_link))
//
//        }
//
//    }
}

fun Activity.Behance(username: String?) {
    val profileUrls = "https://www.behance.net/$username"
    val profileUrl = "https://www.behance.net/$username"
    if (appInstalledOrNot("com.behance.behance")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}


fun Activity.Yelp(username: String?) {
    val profileUrls = "https://www.yelp.com/$username"
    val profileUrl = "https://www.yelp.com/$username"
    if (appInstalledOrNot("com.yelp.android&hl")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

fun Activity.Drive(username: String?) {
    val profileUrls = "https://www.google.com/$username"
    val profileUrl = "https://www.google.com/$username"
    if (appInstalledOrNot("com.google.android.apps.docs")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}


/* todo  Botim*/

fun Activity.BOTIM(username: String?) {
    val profileUrls = "https://botim.me/$username"
    val profileUrl = "https://botim.me/$username"
    if (appInstalledOrNot("im.thebot")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

/*todo kik*/
fun Activity.Kik(username: String?) {
    val profileUrls = "https://www.kik.com//$username"
    val profileUrl = "https://www.kik.com/$username"
    if (appInstalledOrNot("com.behance.behance")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}


/*todo apple music*/
fun Activity.AppleMusic(username: String?) {
    val profileUrls = "https://music.apple.com/us$username"
    val profileUrl = "https://music.apple.com/us$username"
    if (appInstalledOrNot("com.apple.android.music")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}


/*todo vimeo*/
fun Activity.Vimeo(username: String?) {
    val profileUrls = "https://vimeo.com/$username"
    val profileUrl = "https://vimeo.com/$username"
    if (appInstalledOrNot("com.vimeo.android.videoapp")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

/*todo kik*/
fun Activity.MicrosoftTeams(username: String?) {
    val profileUrls = "https://techcommunity.microsoft.com/t5/user/viewprofilepage/$username"
    val profileUrl = "https://techcommunity.microsoft.com/t5/user/viewprofilepage/$username"
    if (appInstalledOrNot("com.microsoft.teams")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

/*todo zoom*/
fun Activity.GoogleMeet(username: String?) {
    val profileUrls = "https://meet.google.com/$username"
    val profileUrl = "https://meet.google.com/$username"
    if (appInstalledOrNot("com.google.android.apps.meetings")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

/*todo QQ*/
fun Activity.QQ(username: String?) {
    val profileUrls = "https://new.qq.com/$username"
    val profileUrl = "https://new.qq.com/$username"
    if (appInstalledOrNot("com.tencent.mobileqq")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}


/*todo zoom*/
fun Activity.Zoom(username: String?) {
    val profileUrls = "https://zoom.us/$username"
    val profileUrl = "https://zoom.us/$username"
    if (appInstalledOrNot("us.zoom.videomeetings")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

/*todo viber*/
fun Activity.Viber(username: String?) {
    val profileUrls = "https://chats.viber.com/$username"
    val profileUrl = "https://chats.viber.com/$username"
    if (appInstalledOrNot("com.viber")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}


fun Activity.Messenger(username: String?) {
    val profileUrls = "https://www.facebook.com/$username"
    val profileUrl = "https://www.facebook.com/$username"
    if (appInstalledOrNot("com.facebook.orca")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

/* todo Twitch*/

fun Activity.Twitch(username: String?) {
    val profileUrls = "https://www.twitch.tv/$username"
    val profileUrl = "https://www.twitch.tv/$username"
    if (appInstalledOrNot("tv.twitch")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}


/* todo Quora*/

fun Activity.Quora(username: String?) {
    val profileUrls = "https://www.quora.com/profile/$username"
    val profileUrl = "https://www.quora.com/profile/$username"
    if (appInstalledOrNot("com.quora")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}


/*  todo wechat*/
fun Activity.Wechat(username: String?) {
    val profileUrls = "https://www.wechat.co.za/$username"
    val profileUrl = "https://www.wechat.co.za/$username"
    if (appInstalledOrNot("com.tencent.mm&hl")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}


/*  todo weibo*/

fun Activity.Weibo(username: String?) {
    val profileUrls = "https://weibo.com/n/$username"
    val profileUrl = "https://weibo.com/n/$username"
    if (appInstalledOrNot("com.weico")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}


fun Activity.Renren(username: String?) {
    val profileUrls = "https://www.renren-inc.com/$username"
    val profileUrl = "https://www.renren-inc.com/$username"
    if (appInstalledOrNot("com.zhongwen")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}


/* todo Dribbble*/

fun Activity.Dribbble(username: String?) {
    val profileUrls = "https://dribbble.com/$username"
    val profileUrl = "https://dribbble.com/$username"
    if (appInstalledOrNot("io.kodular.anujanand301201.Dribbble")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

/* Raddit*/
fun Activity.reddit(username: String?) {
    val profileUrls = "https://www.reddit.com/user/$username"
    val profileUrl = "https://www.reddit.com/user/$username"
    if (appInstalledOrNot("com.reddit.frontpage")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}


/* Tumbler*/
fun Activity.tumblr(username: String?) {
    val profileUrls = "https://$username.tumblr.com"
    val profileUrl = "https://$username.tumblr.com"
    if (appInstalledOrNot("com.tumblr")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}


/* Tumbler*/
fun Activity.paylibb(username: String?) {
    val profileUrls = "https://www.paylib.fr"
    val profileUrl = "https://www.paylib.fr"
    if (appInstalledOrNot("com.tumblr")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}



fun Activity.Lydia(username: String?) {
    val profileUrls = "https://lydia-app.com"
    val profileUrl = "https://lydia-app.com"
    if (appInstalledOrNot("com.tumblr")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}


/* Tumbler*/
fun Activity.tinder(username: String?) {
    val profileUrls = "https://tinder.com/$username"
    val profileUrl = "https://tinder.com/$username"
    if (appInstalledOrNot("com.tinder")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

fun Activity.doctorIntent(username: String?) {
    val profileUrls = "https://www.deviantart.com/$username"
    val profileUrl = "https://www.deviantart.com/$username"
    if (appInstalledOrNot("fr.doctolib.www")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

fun Activity.uber(username: String?) {
    val profileUrls = "https://m.uber.com/ul/$username"
    val profileUrl = "https://m.uber.com/ul/$username"
    if (appInstalledOrNot("com.ubercab")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

fun Activity.mappy(username: String?) {
    val profileUrls = "https://fr.mappy.com/plan/$username"
    val profileUrl = "https://fr.mappy.com/plan/$username"
    if (appInstalledOrNot("com.mappy.app")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

fun Activity.trustPilot(username: String?) {
    val profileUrls = "https://www.trustpilot.com/users/$username"
    val profileUrl = "https://www.trustpilot.com/users/$username"
    if (appInstalledOrNot("com.spotify.tv.android")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

fun Activity.spotify(username: String?) {
    val profileUrls = "https://open.spotify.com/user/$username"
    val profileUrl = "https://open.spotify.com/user/$username"
    if (appInstalledOrNot("com.spotify.tv.android")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

fun Activity.devianArtIntent(username: String?) {
    val profileUrls = "https://www.deviantart.com/$username"
    val profileUrl = "https://www.deviantart.com/$username"
    if (appInstalledOrNot("com.deviantart.android.damobile")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

fun Activity.twitterIntent(username: String?) {
    var intent: Intent? = null
    try {
        packageManager.getPackageInfo("com.twitter.android", 0)
        intent = Intent(Intent.ACTION_VIEW, Uri.parse("twitter://user?screen_name=${username}"))
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    } catch (e: Exception) {
        intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://twitter.com/${username}"))
    }
    this.startActivity(intent)
}

//fun Activity.getFacebookIntent(username: String) {
//    val pm: PackageManager = packageManager
//    var uri = Uri.parse(username)
//    val intent = try {
//        val applicationInfo: ApplicationInfo = pm.getApplicationInfo("com.facebook.katana", 0)
//        if (applicationInfo.enabled) {
//            uri = Uri.parse("fb://facewebmodal/f?href=$username")
//        }
//        Intent(Intent.ACTION_VIEW, uri)
//        this.startActivity(intent)
//
//    } catch (ignored: PackageManager.NameNotFoundException) {
//        val socialLink =
//            if (!username.startsWith("http") || !username.startsWith("https")) "https://www.facebook.com/${username}" else username
//        Intent(Intent.ACTION_VIEW, Uri.parse(socialLink))
//        this.startActivity(intent)
//
//    }
//}

fun Activity.getFacebookIntent(userName: String) {
    val profileUrls = "https://www.facebook.com/$userName"
    val profileUrl = "https://www.facebook.com/$userName"
    if (appInstalledOrNot("com.facebook.katana")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}



fun Activity.instagramIntent(userName: String) {
    val profileUrls = "http://instagram.com/_u/$userName"
    val profileUrl = "http://instagram.com/$userName"
    if (appInstalledOrNot("com.instagram.android")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }
}

fun Activity.call(link: String) {
    try {
        val intent = Intent(Intent.ACTION_DIAL)
        intent.data = Uri.parse("tel:${link}")
        startActivity(intent)
    } catch (e: java.lang.Exception) {
    }

}

fun Activity.youTubeIntent(userName: String) {
    try {
        val intent =
            Intent(
                Intent.ACTION_VIEW,
                Uri.parse(userName)
            ).setPackage("com.google.android.youtube")
        startActivity(intent)
    } catch (e: ActivityNotFoundException) {
        try {
            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(userName)))
        } catch (e: java.lang.Exception) {
//            showToast(this, this.resources.getString(R.string.valid_link))
        }
    }
}

fun Activity.haraj(link: String) {
    try {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(link))
        intent.setPackage("com.haraj.app")
        startActivity(intent)
    } catch (e: ActivityNotFoundException) {
        try {
            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(link)))
        } catch (e: Exception) {
//            showToast(this, this.resources.getString(R.string.valid_link))

        }

    }
}

fun Activity.calendly(link: String) {
    try {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(link))
        intent.setPackage("com.calendly.app")
        startActivity(intent)
    } catch (e: ActivityNotFoundException) {
        startActivity(
            Intent(
                Intent.ACTION_VIEW,
                Uri.parse("https://$link")
            )
        )
    }
}

fun Activity.imo(link: String) {
    try {
        val intent = Intent("android.intent.action.VIEW")
        intent.setPackage("com.imo.android.imoim")
        intent.data = Uri.parse("sms:$link")
        startActivity(intent)
        /* val txtIntent = Intent(Intent.ACTION_SEND).setPackage("com.imo.android.imoim")
     txtIntent.type = "text/plain"
     intent.data = Uri.parse("sms:$link")
     txtIntent.putExtra(Intent.EXTRA_TEXT, "")
     startActivity(txtIntent)*/
    } catch (e: ActivityNotFoundException) {
        startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://imo.im/")))
    }
}

fun Activity.bayt(link: String) {
    try {
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse(link))
        intent.setPackage("com.bayt")
        startActivity(intent)
    } catch (e: ActivityNotFoundException) {
        val socialLinks =
            if (!link.startsWith("http") || !link.startsWith("https")) "https://people.bayt.com/${link}" else link
        startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(socialLinks)))
    }
}

private fun Activity.appInstalledOrNot(uri: String): Boolean {
    val pm: PackageManager = this.packageManager
    try {
        pm.getPackageInfo(uri, PackageManager.GET_ACTIVITIES)
        return true
    } catch (e: PackageManager.NameNotFoundException) {
    }
    return false
}

fun Activity.linkedInIntent(userName: String) {
//    if (!userName.startsWith("http")) {
////        showToast(this, this.resources.getString(R.string.valid_link))
//        return
//    } else {
//        try {
//            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(userName))
//            intent.setPackage("com.linkedin.android")
//            startActivity(intent)
//        } catch (e: Exception) {
//            startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(userName)))
//        }
//    }


    val profileUrls = "https://www.linkedin.com/"
    val profileUrl = "https://www.linkedin.com/"
    if (appInstalledOrNot("com.linkedin.android")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }


}

//Todo gmail,yahoo,orkut
@SuppressLint("IntentReset")
fun Activity.gmail(emailAddress: String) {
    val email = Intent(Intent.ACTION_SEND)
    email.data = Uri.parse("mailto:")
    email.putExtra(Intent.EXTRA_EMAIL, arrayOf(emailAddress))
    email.putExtra(Intent.EXTRA_SUBJECT, "")
    email.putExtra(Intent.EXTRA_TEXT, "")
    email.type = "message/rfc822"
    startActivity(Intent.createChooser(email, "Send Mail Using :"))
    /* try {
     val intent = Intent(Intent.ACTION_SEND).setPackage("com.google.android.gm")
     intent.type = "plain/text"
     intent.putExtra(Intent.EXTRA_EMAIL, arrayOf(emailAddress))
     intent.putExtra(Intent.EXTRA_SUBJECT, "")
     intent.putExtra(Intent.EXTRA_TEXT, "")
     startActivity(Intent.createChooser(intent, ""))
 } catch (e: Exception) {
     ToastUtil.error(this, this.resources.getString(R.string.please_try_again))
 }*/
}

//Todo signal
fun Activity.signal(link: String) {
    try {
        val intent = Intent("android.intent.action.VIEW")
        intent.setPackage("org.thoughtcrime.securesms")
        intent.data = Uri.parse("sms:$link")
        startActivity(intent)
    } catch (e: Exception) {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse("https://signal.org/en/")))
    }
}

//Todo signal
fun Activity.soundCloud(link: String) {
    try {
        if (!link.contains("https") || !link.contains("http")) {
            val intent = Intent("android.intent.action.VIEW")
            intent.setPackage("com.soundcloud.android")
            intent.data = Uri.parse("soundcloud://${link}")
            this.startActivity(intent)
        } else {
            this.startActivity(
                Intent(
                    Intent.ACTION_VIEW,
                    Uri.parse(link)
                )
            )
        }

    } catch (e: Exception) {
        val soundCloudLink =
            if (!link.contains("https") || !link.contains("http")) "https://soundcloud.com/${link}" else link

        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(soundCloudLink)))
    }
}

//Todo signal
fun Activity.payPal(link: String) {

    val profileUrls = "https://www.paypal.com/"
    val profileUrl = "https://www.paypal.com/"
    if (appInstalledOrNot("com.paypal")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(profileUrls))
            intent.setPackage(packageName)
            this.startActivity(intent)
        } catch (e: ActivityNotFoundException) {
            this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
        }
    } else {
        this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(profileUrl)))
    }


//    val soundCloudLink =
//        if (!link.contains("https") || !link.contains("http")) "https://www.${link}" else link
//    this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(soundCloudLink)))
}

//Todo signal
fun Activity.cashApp(username: String) {
    val cashAppLink =
        if (!username.contains("https") || !username.contains("http")) "https://www.cash.app/${username}" else username
    this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(cashAppLink)))
}

//Todo signal
fun Activity.venmo(username: String) {
    val venmoLink =
        if (!username.contains("https") || !username.contains("http")) "https://www.venmo.com/${username}" else username
    this.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(venmoLink)))
}

//Todo telegram
fun Activity.telegramIntent(userName: String) {
    val socialLink = userName.replace("@", "").replace("https://t.me/", "")
    try {
        try {
            packageManager.getPackageInfo("org.telegram.messenger", 0)
        } catch (e: Exception) {
            packageManager.getPackageInfo("org.thunderdog.challegram", 0)
        }
        this.startActivity(
            Intent(
                Intent.ACTION_VIEW,
                Uri.parse("tg://resolve?domain=${socialLink}")
            )
        )
    } catch (e: Exception) {
        this.startActivity(
            Intent(Intent.ACTION_VIEW, Uri.parse("http://www.telegram.me/$socialLink"))
        )
    }
}

fun Activity.mapDirection(address: String) {
    val intent = Intent(Intent.ACTION_VIEW)
    val index = address.indexOf("https://")
    intent.data = when (index) {
        -1 -> {
            Uri.parse("http://maps.google.co.in/maps?dir=$address")
        }
        0 -> {
            Uri.parse(address)
        }
        else -> {
            Uri.parse(address.substring(index))
        }
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}

fun Activity.map(address: String) {
    val intent = Intent(Intent.ACTION_VIEW)
    val index = address.indexOf("https://")
    intent.data = when (index) {
        -1 -> {
            Uri.parse("http://maps.google.co.in/maps?q=$address")
        }
        0 -> {
            Uri.parse(address)
        }
        else -> {
            Uri.parse(address.substring(index))
        }
    }
    if (intent.resolveActivity(packageManager) != null) {
        startActivity(intent)
    }
}

fun Activity.textMessage(phoneNumber: String) {
    val intent = Intent(Intent.ACTION_VIEW, Uri.parse("sms:$phoneNumber"))
    intent.putExtra("sms_body", "Hi")
    startActivity(intent)
}

fun Activity.facebookMessanger(FbUserID: String) {


    var link = ""
    link = if (FbUserID.startsWith("https://") || FbUserID.startsWith("http://")) {
        when {
            FbUserID.contains("https://www.facebook.com/profile.php?id=") -> {
                "m.me/" + FbUserID.replace("https://www.facebook.com/profile.php?id=", "")
            }
            FbUserID.contains("https://www.facebook.com/") -> {
                "m.me/" + FbUserID.replace("https://www.facebook.com/", "")
            }


            else -> {
                FbUserID.replace("https://", "").replace("http://", "")
            }
        }
    } else {
        FbUserID
    }
    val installed: Boolean = this.appInstalledOrNot("com.facebook.orca")
    if (installed) {
        try {
            CoroutineScope(Dispatchers.Main).launch {
                val intent = Intent(
                    "android.intent.action.VIEW",
                    Uri.parse("fb-messenger://$link")
                ).setPackage("com.facebook.orca")
                intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_ACTIVITY_CLEAR_TOP)

                startActivity(intent)
            }

        } catch (e: ActivityNotFoundException) {
        }
    } else {
        showToast(this, "Facebook Messenger app not installed on your device")
    }
}

fun showToast(context: Activity, message: String) {
    Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
}


fun Activity.openWhatsApp(number: String) {
    val installed: Boolean = this.appInstalledOrNot("com.whatsapp")
    if (installed) {
        val intent = Intent(Intent.ACTION_VIEW)
        intent.data = Uri.parse("http://api.whatsapp.com/send?phone=$number&text=Hi")
        startActivity(intent)
    } else {
        val intent = Intent(Intent.ACTION_VIEW)
        intent.data = Uri.parse("http://api.whatsapp.com/send?phone=$number&text=Hi")
        startActivity(intent)
    }
}

fun Activity.pinterest(userName: String) {
    try {
        startActivity(
            Intent(Intent.ACTION_VIEW, Uri.parse("pinterest://www.pinterest.com/${userName}"))
        )
    } catch (e: java.lang.Exception) {
        startActivity(
            Intent(
                Intent.ACTION_VIEW, Uri.parse("https://www.pinterest.com/${userName}")
            )
        )
    }
}


fun Activity.chrome(url: String) {
    try {
//        val chrome = Intent("android.intent.action.VIEW")
//        chrome.setPackage("com.android.chrome")
//        chrome.data = Uri.parse(url)
//        startActivity(chrome)

//        val url = "http://www.stackoverflow.com"
        val i = Intent()
        i.setPackage("com.android.chrome")
        i.action = Intent.ACTION_VIEW
        i.data = Uri.parse("http://" + url)
        startActivity(i)
    } catch (e: java.lang.Exception) {
        val intent = Intent(Intent.ACTION_VIEW)
        intent.data = Uri.parse(url)
        startActivity(intent)
    }

//    val uri = Uri.parse("www.google.com")
//    val intent = Intent(Intent.ACTION_VIEW, uri)
}


fun Activity.skype(userName: String) {
    try {
        val skype = Intent("android.intent.action.VIEW")
        skype.setPackage("com.skype.raider")
        skype.data = Uri.parse("skype:$userName?chat")
        startActivity(skype)
    } catch (e: java.lang.Exception) {
        val intent = Intent(Intent.ACTION_VIEW)
        intent.data = Uri.parse("https://web.skype.com/$userName?chat")
        startActivity(intent)
    }
}

fun Activity.openUrl(url: String) {
    try {
        val i = Intent(Intent.ACTION_VIEW)
        i.data = Uri.parse(url)
        startActivity(i)
    } catch (e: Exception) {
    }
}

fun Activity.openWebsite(url: String) {
    try {
        val link = if (!url.contains("https://")) "https://$url" else url
        val i = Intent(Intent.ACTION_VIEW)
        i.data = Uri.parse(link)
        startActivity(i)
    } catch (e: Exception) {
    }
}

fun Activity.openTikTokProfile(userName: String) {
    val installed: Boolean = this.appInstalledOrNot("com.zhiliaoapp.musically")
    if (installed) {
        val uri: Uri = Uri.parse("https://www.tiktok.com/@${userName}")
        val intent = Intent(Intent.ACTION_VIEW, uri)
        intent.setPackage("com.zhiliaoapp.musically")
        if (intent.resolveActivity(packageManager) != null) {
            startActivity(intent)
        }
    } else {
        val uri: Uri = Uri.parse("https://www.tiktok.com/@${userName}")
        val intent = Intent(Intent.ACTION_VIEW, uri)
        startActivity(intent)
    }
}

private fun Activity.snapchat(snapchatId: String) {
    try {
        val intent =
            Intent(Intent.ACTION_VIEW, Uri.parse("https://snapchat.com/add/$snapchatId"))
        intent.setPackage("com.snapchat.android")
        startActivity(intent)
    } catch (e: java.lang.Exception) {
        startActivity(
            Intent(
                Intent.ACTION_VIEW,
                Uri.parse("https://snapchat.com/add/$snapchatId")
            )
        )
    }
}

private fun Activity.openLink(url: String) {
    var url = url;
    if (!url?.startsWith("http://")!! && !url?.startsWith("https://")!!) {
        url = "http://" + url;
    }
    val browserIntent =
        Intent(Intent.ACTION_VIEW, Uri.parse(url))
    startActivity(browserIntent)
}








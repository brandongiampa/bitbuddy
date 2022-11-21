<template>
  <div class="about">
    <hero-section :is-main-page="false" />
    <div class="container">
      <div class="p-5">
        <h2>Who We Are</h2>
        <p>
          Bitbuddy is a collective of blockchain developers, financial analysts, bankers, lobbyists and cryptocurrency enthusiasts of all backgrounds, 
          all sharing a common outlook for the future of financial transactions worldwide.
        </p>
        <h3>A Passion for Blockchain</h3>
        <p>Our mantra at Bitbuddy is, "Once you've seen the future, the present is just a series of transactions." 
          That is, the only way to get where we are going is to move forward in the same way blockchain is written; a next step may be provided, but the end goal is not.
        </p>
        <p>
          Unfortunately, world governments all have their own end goals that conflict with ours.
          Thus, we find our calling in offering an alternative to the centralized banking, governing and <i>thinking</i> that plagues the modern world.
        </p>
        <h4>A Return to Human Nature</h4>
        <p>
          Philosophers have argued for millenia about what human nature entails, but nowadays there is a palpable feeling that governments do not represent us.
          The decentralization of currency is the only way to liberate ourselves from this.
        </p>
        <h2 style="margin-top: 27px;">What We Do</h2>
        <p>You've come this far and you've used our app. But what is this for?</p>
        <h3>A Fool's Errand</h3>
        <p>Okay, it's time for me to admit that this page is little more than the impromptu ramblings of a web developer. I don't even know where I came up with this stuff.</p>
        <p>I was once advised to try to make all my portfolio apps/websites appear as if they were real. 
          You may even notice this if you've browsed my earlier works.
        </p>
        <h4>The Truth</h4>
        <p>In truth, Bitbuddy is not any real organization. This is simply a web app for my portfolio.</p>
        <h3>Stick With the Theme</h3>
        <p>To keep my branding consistent, my next project is going to be called "Fitbuddy." It. will be an app to log progress in exercise.</p>
        <h4>A Two-Pronged Attack</h4>
        <p>
          As strange as this sounds, before ever learning web dev, I was trying to teach myself Xamarin.forms. 
          Yes, the C# multi-platform mobile app framework.
        </p>
        <p>
          My main goal for Fitbuddy is further practice with Vue, so I will make a web app with this functionality. 
          However, since buying an iPhone for the first time a couple years ago, I have not been able to find such an app without paying for it. 
          Thus, it might be a good time to <i>return to my roots</i> and make the mobile version for myself.
        </p>
        <h3>Ulterior Motives</h3>
        <p>Now, I'm just writing more to make sure this page fills the vertical viewport of pretty much every browser. Why, you ask?</p>
        <h4>A Pet Peeve</h4>
        <p>I hate when the scroll bar resizes the window when you click a link in the navbar.</p>
        <p>I also can't believe you've read this far. You should stop.</p>
        <p><i>-Brandon</i></p>
      </div>
    </div>
  </div>
</template>

<script lang="js">
  import HeroSection from '@/components/HeroSection.vue'; // @ is an alias to /src

  export default {
    components: {
      HeroSection
    }
  }
</script>

<style lang="scss" scoped>
  h2 {
    font-weight: bold;
  }
  h3, h4 {
    margin-bottom: 9px;
  }
  h3 {
    margin-top: 21px;
  }
  h4 {
    margin-top: 15px;
    font-style: italic;
  }
  p {
    font-size: 18px;
    margin-top: 5px;
    margin-bottom: 5px;
    line-height: 28px;
  }
</style>
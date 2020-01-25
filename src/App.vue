<template>
  <div id="app" class="container text-center">
      <h1 class="title">Brackets Validator</h1>
      <div class="input">
          <input placeholder="Type your expression: (a+b)" v-model="text" type="text">
      </div>
      <br>
    <div class="preview" v-if="text">
        <span :key="index" :class="index === errorIndex ? 'error': ''" v-for="(t, index) in arrayOfText">{{ t }}</span>
    </div>
      <div class="created-by">
          Created By: <a href="https://fb.com/mehedimi">Mehedi Hasan</a>
      </div>
  </div>
</template>

<script>
    import Stack from './Stack.js';

export default {
  data() {
    return {
        text: '[{())}]',
        errorIndex: undefined,
        bracketsPair: {
            ')': '(',
            '}': '{',
            ']': '['
        },
        stack: new Stack
    }
  },
  computed: {
    arrayOfText() {
      return this.text.split('')
    }
  },
    methods: {
      check() {
          for (const [index, char] of this.arrayOfText.entries()) {
              if (char.match(/\(|\{|\[/)) {
                  this.stack.push(char);
                  continue;
              }

              if (char.match(/\)|\}|\]/)) {
                  if (this.bracketsPair[char] !== this.stack.pop()) {
                      this.errorIndex = index;
                      break;
                  }
              }
          }
          if (!this.stack.isEmpty() && !this.errorIndex) {
              this.errorIndex = (this.text.length - 1);
          }
      }
    },
    watch: {
        text: {
            immediate: true,
            handler() {
                this.errorIndex = undefined;
                this.stack.clear();
                this.check();
            }
        }
    }
}
</script>

<style lang="scss">
    @font-face {
        font-family: OperatorMono;
        src: url("./assets/fonts/OperatorMono-Light.otf") format("opentype");
    }

    .container {
        max-width: 900px;
        margin: 30px auto auto;
    }
    .input {
        box-sizing: border-box;
        text-align: center;

        input {
            width: 500px;
            padding: 10px;
            font-size: 30px;
            text-align: center;
            letter-spacing: 10px;
            outline: none;
            border: 2px solid #42b983;
            border-radius: 4px;
            font-family: 'OperatorMono', monospace;
            &::placeholder {
                letter-spacing: 1px;
                font-family: 'OperatorMono', monospace;
                font-size: 23px;
            }
        }
    }
    .error {
        color: #e74c3c
    }
    .text-center {
        text-align: center;
    }

    .preview {
        font-size: 40px;
        border: 1px solid #42b983;
        display: inline-block;
        padding: 10px 20px;
        border-radius: 4px;
        font-weight: bold;
        font-family: 'OperatorMono', monospace;
        overflow-x: scroll;

        span {
            margin-right: 3px;
            margin-left: 3px;
        }
    }

    .title {
        font-family: 'Bangers', cursive;
        letter-spacing: 4px;
        color: #42b983;
    }
    .created-by {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: center;
        padding: 40px;
        box-sizing: border-box;
        font-size: 40px;
        font-family:'OperatorMono', monospace;
        a {
            color: #42b983;
        }
    }
</style>
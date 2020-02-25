# React Native Dev Tips for The Nathanists 
### *By Oscar and Matej*

## Elements
| HTML5                    | React Native                                        | Useful resource(s)                                     | Notes                          |
| ------------------------ | --------------------------------------------------- | ------------------------------------------------------ | ------------------------------ |
| `<div>`                  | `<View>`                                            | https://reactnative.dev/docs/view                      |                                |
| `<h1>`                   | `<Text style={styles.h1Text}>`                      |                                                        | h1, h2, h3, h4 text styles are manually defined in our stylesheet |
| `<h2>`                   | `<Text style={styles.h2Text}>`                      |                                                        |                                |
| `<h3>`                   | `<Text style={styles.h3Text}>`                      |                                                        |                                |
| `<h4>`                   | `<Text style={styles.h4Text}>`                      |                                                        |                                |
| `<p>`, `<span>`          | `<Text style={styles.text}>`                        | https://reactnative.dev/docs/text                      |                                |
| `<input>`                | `<TextInput>`                                       | https://reactnative.dev/docs/textinput                 |                                |
| `<input type='email'>`   | `<TextInput textContentType='emailAddress'>`        | https://reactnative.dev/docs/textinput#textcontenttype |                                |
| `<button>`               | `<Button>`                                          | https://reactnative.dev/docs/button                    |                                |
| `(css) overflow: scroll` | `<ScrollView>`                                      | https://reactnative.dev/docs/scrollview                | Wrap a view inside this for it to be scrollable if the whole thing can't fit on the screen at once. |

## Notes dump
(if you want, you can dump any notes here for future reference)
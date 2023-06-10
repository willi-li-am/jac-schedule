import CopyToClipboard from "react-copy-to-clipboard"

function Test () {
    console.log(<table>
        <div>adadad <br/> adadada</div>
    </table>)
    return(
        <div>
            <table>
                <tr>
                    <th>one</th>
                    <th>two</th>
                    <th>three</th>
                </tr>
                <tr>
                    <td>a</td>
                    <td>b</td>
                    <td>c</td>
                </tr>
            </table>
        </div>
    )
}

export default Test
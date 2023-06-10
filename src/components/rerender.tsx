function ReRender(){
    console.log("rendered!")
    let number = Math.random() * 10
    return(<div>
        {number}
    </div>)
}

export default ReRender
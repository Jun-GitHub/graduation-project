/**
 * Created by iy7 on 2015/3/25.
 */
function scrollDiv(dom, totalHeight) {

    var father = dom.parentNode;
    if (father) {
       var grandpa= father.parentNode
        grandpa.style.overflow = 'hidden';
    }


    scrollDiv.windowChange = function (nowHeight) {
        min = nowHeight - domHeight;
        if (min > 0) {
            min = 0;
        }
    }
    var domHeight = father.offsetHeight + 50;

    var min = totalHeight - domHeight;
    if (min > 0) {
        min = 0;
    }
    var max = 0;

    var enable = false;
    var anchor = 0;
    var move = 0;


    function moveWheel(event) {
        domHeight = father.offsetHeight + 50;
        var min = totalHeight - domHeight;
        if (min > 0) {
            min = 0;
        }
        var deltaH = event.wheelDeltaY;
        move = move + deltaH;
        if (move > max) {
            move = max;
        }
        if (move < min) {
            move = min;
        }
        father.style.transform = "translateY(" + (move) + "px)";
    }


    father.addEventListener('DOMMouseScroll', function (event) {
        event.preventDefault();
        moveWheel(event);
    }, false);

    dom.addEventListener('mousewheel', function (event){
        event.preventDefault();
        moveWheel(event);
    }, false);

    father.addEventListener('mousedown', function (event) {
        domHeight = father.offsetHeight + 50;
        var min = totalHeight - domHeight;
        if (min > 0) {
            min = 0;
        }
        enable = true;
        anchor = event.clientY;
    }, false);

    father.addEventListener('mouseup', function (event) {
        if (enable) {
            var nowY = event.clientY;
            var delta = anchor - nowY;
            move = move + delta;
            if (move > max) {
                move = max;
            }
            if (move < min) {
                move = min;
            }
            father.style.transform = "translateY(" + (move) + "px)";
            enable = false;
        }
    }, false);


    father.addEventListener('mouseleave', function (event) {
        console.log(event);
        if (enable) {
            var nowY = event.clientY;
            var delta = anchor - nowY;
            move = move + delta;
            if (move > max) {
                move = max;
            }
            if (move < min) {
                move = min;
            }
            father.style.transform = "translateY(" + (move) + "px)";
            enable = false;
        }
    }, false);

    father.addEventListener('mousemove', function (event) {

        if (enable) {
            var nowY = event.clientY;
            var delta = anchor - nowY;
            var nowMove = move + delta;
            if (nowMove > max) {
                nowMove = max;
            }
            if (nowMove < min) {
                nowMove = min;
            }
            father.style.transform = "translateY(" + ( nowMove) + "px)";
        } else {

        }
    }, false);

}
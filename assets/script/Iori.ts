const { ccclass, property } = cc._decorator;

enum IoriState {
    stand,
    jump,
    crouch,
    foward,
    stand_defense,
}

@ccclass
export default class Iori extends cc.Component {

    @property(cc.Animation)
    _anim: cc.Animation = null;

    @property({
        type: cc.Enum(IoriState)
    })
    _state: IoriState = IoriState.stand;

    set state(value: IoriState) {

        if (value !== this._state) {
            this._state = value;
            this._anim.stop();

            let animName = IoriState[this._state];
            this._anim.play(animName);
        }

    }

    get state(): IoriState {
        return this._state;
    }

    @property(cc.RigidBody)
    _body: cc.RigidBody = null;

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

        this._anim = this.node.getComponent(cc.Animation);
        this._body = this.node.getComponent(cc.RigidBody);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(dt) {
        let speed = this._body.linearVelocity;

        if (this.dpressed) {
            speed.x = 100;
        }

        this._body.linearVelocity = speed;
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.KEY.w:
                this.state = IoriState.jump;
                break;
            case cc.KEY.s:
                this.state = IoriState.crouch;
                break;
            case cc.KEY.d:
                this.state = IoriState.foward;
                this.dpressed = true;
                break;
            case cc.KEY.a:
                this.state = IoriState.stand_defense;
                break;
            default:
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.KEY.d:
                this.state = IoriState.stand;
                this.dpressed = false;
                break;
            case cc.KEY.a:
                this.state = IoriState.stand;
                break;
            default:
                break;
        }
    }

    onAnimationEnd() {
        this.state = IoriState.stand;
    }

}

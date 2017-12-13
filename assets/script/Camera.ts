const { ccclass, property } = cc._decorator;

@ccclass
export default class Camera extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;

    @property(cc.Camera)
    _camera: cc.Camera = null;

    onLoad() {
        this._camera = this.getComponent(cc.Camera);
    }

    onEnable() {
        cc.director.getPhysicsManager().attachDebugDrawToCamera(this._camera);
    }

    onDisable() {
        cc.director.getPhysicsManager().detachDebugDrawFromCamera(this._camera);
    }

    lateUpdate() {
        let winSize = cc.winSize;

        let targetPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        let newPos = this.node.parent.convertToNodeSpaceAR(targetPos);
        if (newPos.x <= 0) {
            newPos.x = 0;
        }

        if(newPos.x >= 385){
            newPos.x = 385;
        }

        newPos.y = winSize.height / 2;
        this.node.position = newPos;
    }
}

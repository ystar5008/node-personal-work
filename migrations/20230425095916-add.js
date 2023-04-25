'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Posts", "nickname", {
      allowNull: false, // NOT NULL
      type: DataTypes.STRING,
      unique: true
    })

    //  * Add altering commands here.
    //  *
    //  * Example:
    //  * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
    //  */
  },

  async down(queryInterface, Sequelize) {
    //await queryInterface.renameColumn('Users', 'email', 'nickname')
    //undo??
    //await queryInterface.renameColumn(테이블명, 컬럼 이름 변경 전 , 컬럼 이름 변경 후 )
  }
};
